import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from '@/config/i18n';

// Supported locales 
// Note: Ensure this matches src/config/i18n.ts

const MAX_HEADER_LENGTH = 1000;

// Advanced locale detection using algorithms
function getLocale(request: NextRequest): string {
    try {
        // Defensive coding: limit header length to prevent DOS/overflow
        const rawAcceptLanguage = request.headers.get('accept-language') || '';
        const safeAcceptLanguage = rawAcceptLanguage.length > MAX_HEADER_LENGTH
            ? rawAcceptLanguage.substring(0, MAX_HEADER_LENGTH)
            : rawAcceptLanguage;

        const headers = { 'accept-language': safeAcceptLanguage };
        const languages = new Negotiator({ headers }).languages();

        return match(languages, locales, defaultLocale);
    } catch (e) {
        // Fallback if match fails or Negotiator throws (e.g. malformed headers)
        console.error('Locale detection failed, falling back to default:', e);
        return defaultLocale;
    }
}

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    const locale = getLocale(request);

    // Construct new URL
    request.nextUrl.pathname = `/${locale}${pathname}`;

    // Use 307 Temporary Redirect for locale redirection to preserve method/body
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        // Skip all Next.js internals and static assets (images, favicon, etc.)
        '/((?!_next|favicon.ico|api|.*\\..*).*)',
    ],
};
