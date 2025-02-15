import createMiddleware from 'next-intl/middleware';
import { NextResponse, type NextRequest } from 'next/server';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';

const locales = ['en', 'es'];

// First handle internationalization
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'always'
});

// Then handle Supabase auth
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  console.log('middleware');
  // Refresh session if expired
  await supabase.auth.getSession();

  // Handle internationalization
  return intlMiddleware(request);
}

// Match all paths except api, static files, etc
export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
}; 