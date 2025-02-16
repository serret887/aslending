import { routing } from '@/i18n/routing';

export const routes = {
  home: '/',
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    verifyEmail: '/auth/verify-email',
    callback: '/auth/callback',
  },
  dashboard: '/dashboard',
  calculator: '/calculator',
  profile: '/profile',
  about: '/about',
  contact: '/contact',
} as const;

export const getLocalizedRoute = (route: string, locale: string = routing.defaultLocale) => {
  console.log('getLocalizedRoute', route, locale);
  // Handle root route specially
  if (route === '/') {
    return `/${locale}`;
  }
  // For non-root routes, append locale prefix
  return `/${locale}${route}`;
};

// Helper to get the current locale from a pathname
export const getLocaleFromPathname = (pathname: string): string => {
  const segments = pathname.split('/').filter(Boolean);
  return segments[0] && routing.locales.includes(segments[0] as any) 
    ? segments[0] 
    : routing.defaultLocale;
}; 