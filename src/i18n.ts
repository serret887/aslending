import {getRequestConfig} from 'next-intl/server';
import {createSharedPathnamesNavigation} from 'next-intl/navigation';

export const locales = ['en', 'es'] as const;
export const defaultLocale = 'en' as const;

export default getRequestConfig(async ({locale}) => {
  if (!locales.includes(locale as any)) {
    return { messages: (await import(`../messages/${defaultLocale}.json`)).default };
  }
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
}); 