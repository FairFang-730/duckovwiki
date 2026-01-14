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
    const response = NextResponse.next();

    // 1. Inject X-Robots-Tag Header (Global)
    // index, follow: Allow indexing and link following
    // max-image-preview:large: Allow large image previews in search results
    response.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large');

    // 2. Localization Logic

    // Check if there is any supported locale in the pathname
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        return response;
    }

    // Redirect if there is no locale
    const locale = getLocale(request);

    // Construct new URL
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // Use 307 Temporary Redirect for locale redirection
    const redirectResponse = NextResponse.redirect(newUrl);

    // Copy the X-Robots-Tag header to the redirect response as well
    redirectResponse.headers.set('X-Robots-Tag', 'index, follow, max-image-preview:large');

    return redirectResponse;
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        // Skip all Next.js internals and static assets (images, favicon, etc.)
        '/((?!_next|favicon.ico|api|.*\\..*).*)',
    ],
};
