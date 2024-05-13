import { MetadataRoute } from 'next'
 
// export default function sitemap(): MetadataRoute.Sitemap {
//   return [
//     {
//       url: 'https://titanproject.top',
//       lastModified: new Date(),
//       changeFrequency: 'always',
//       priority: 1,
//       alternates: {
//         languages: {
//           en: 'https://titanproject.top/en',
//           ru: 'https://titanproject.top/ru',
//         },
//       },
//     },
//     {
//       url: 'https://titanproject.top/sign-in',
//       lastModified: new Date(),
//       priority: 0.9,
//       alternates: {
//         languages: {
//           en: 'https://titanproject.top/en/sign-in',
//           ru: 'https://titanproject.top/ru/sign-in',
//         },
//       },
//     },
//     {
//       url: 'https://titanproject.top/sign-up',
//       lastModified: new Date(),
//       priority: 0.9,
//       alternates: {
//         languages: {
//           en: 'https://titanproject.top/en/sign-up',
//           ru: 'https://titanproject.top/ru/sign-up',
//         },
//       },
//     },
//   ]
// }

import { i18nLocales } from '@/shared/constants/i18n-locales';
 
// Can be imported from shared config
const defaultLocale = 'en' as const;
const locales = i18nLocales;
 
const pathnames = ['/', '/sign-in', '/sign-up', '/*'];
const host = 'https://titanproject.top';
 
export default function sitemap(): MetadataRoute.Sitemap {
  function getUrl(pathname: string, locale: string) {
    return `${host}/${locale}${pathname === '/' ? '' : pathname}`;
  }
 
  return pathnames.map((pathname) => ({
    url: getUrl(pathname, defaultLocale),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((locale) => [locale, getUrl(pathname, locale)])
      )
    }
  }));
}