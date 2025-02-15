import createMiddleware from 'next-intl/middleware';
import { locales } from '../i18n';

export const i18nMiddleware = createMiddleware({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed'
}); 