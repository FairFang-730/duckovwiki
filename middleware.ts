import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';
import { locales, defaultLocale } from '@/config/i18n';

// Supported locales 
// Note: Ensure this matches src/config/i18n.ts

// Advanced locale detection using algorithms
function getLocale(request: NextRequest): string {
    const headers = { 'accept-language': request.headers.get('accept-language') || '' };
    const languages = new Negotiator({ headers }).languages();

    try {
        return match(languages, locales, defaultLocale);
    } catch (e) {
        // Fallback if match fails
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
