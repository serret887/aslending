import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'
import { routes, getLocaleFromPathname, getLocalizedRoute } from './src/config/routes'

const publicRoutes = [
  routes.home,
  routes.auth.login,
  routes.auth.register,
  routes.auth.verifyEmail,
  routes.auth.callback
]

const authRoutes = [
  routes.auth.login,
  routes.auth.register
]

const intlMiddleware = createIntlMiddleware(routing)

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value
        },
        set(name: string, value: string, options: any) {
          req.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: any) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )
  
  // Check auth
  const {
    data: { session },
  } = await supabase.auth.getSession()

  const path = req.nextUrl.pathname
  const locale = getLocaleFromPathname(path)
  
  // Check if the current path is an auth route (login or register)
  const isAuthRoute = authRoutes.some(route => 
    path.endsWith(route) || path.endsWith(`/${locale}${route}`)
  )

  // If user is logged in and trying to access auth routes, redirect to dashboard
  if (session && isAuthRoute) {
    return NextResponse.redirect(new URL(getLocalizedRoute(routes.dashboard, locale), req.url))
  }

  const isPublicRoute = publicRoutes.some(route => 
    path.endsWith(route) || path.endsWith(`/${locale}${route}`)
  )

  // Handle internationalization first
  const intlResponse = await intlMiddleware(req)

  // For public routes, just handle internationalization
  if (isPublicRoute) {
    return intlResponse
  }

  // For protected routes, check auth
  if (!session) {
    const redirectUrl = new URL(getLocalizedRoute(routes.auth.login, locale), req.url)
    return NextResponse.redirect(redirectUrl)
  }

  return intlResponse
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - api (API routes)
    // - _next/static (static files)
    // - _next/image (image optimization files)
    // - favicon.ico (favicon file)
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 