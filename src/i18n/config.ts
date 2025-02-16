export const defaultLocale = 'en';
export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

export default {
  defaultLocale,
  locales
} as const; 