import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import i18nConfig from '@/i18n/config';

// Middleware for internal Next.js requests
const PUBLIC_FILE = /\.(.*)$/;

export default createMiddleware({
  // A list of all locales that are supported
  locales: i18nConfig.locales,
  // Used when no locale matches
  defaultLocale: i18nConfig.defaultLocale,
  // Set to 'always' to make the locale prefix required
  localePrefix: 'always'
});

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 