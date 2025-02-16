import {getRequestConfig} from 'next-intl/server';
import i18nConfig from './config';
 
  export default getRequestConfig(async ({requestLocale}) => {
    let locale = await requestLocale;
  if (!i18nConfig.locales.includes(locale as any)) {
    return { messages: (await import(`../../messages/${i18nConfig.defaultLocale}.json`)).default };
  }
  return {
    messages: (await import(`../../messages/${locale}.json`)).default
  };
});