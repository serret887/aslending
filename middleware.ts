import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18nMiddleware } from './src/middleware/i18n';

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req: request, res });

  // Refresh session if expired
  await supabase.auth.getSession();

  // Handle internationalization
  return i18nMiddleware(request);
}

export const config = {
  matcher: [
    // Match all routes except for
    // - api (API routes)
    // - _next (Next.js internals)
    // - _vercel (Vercel internals)
    // - static files
    '/((?!api|_next|_vercel|.*\\.[\\w]+$).*)',
    // Also match /
    '/'
  ]
}; 