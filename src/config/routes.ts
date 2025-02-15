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

// Helper function to get localized route
export const getLocalizedRoute = (route: string, locale: string) => {
  if (locale === 'en') {
    return route;
  }
  return `/${locale}${route}`;
}; 