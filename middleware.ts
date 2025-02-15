import createMiddleware from 'next-intl/middleware';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'en',

  // Redirect to default locale if no locale is found
  localePrefix: 'always'
});

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired
  await supabase.auth.getSession();

  // Handle internationalization
  return intlMiddleware(req);
}

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|es)/:path*']
}; 