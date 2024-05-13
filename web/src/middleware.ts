import { i18nLocales } from "@/shared/constants/i18n-locales";
import createMiddleware from "next-intl/middleware";
import {locales, localePrefix} from './navigation';

export default createMiddleware({
  defaultLocale: 'en',
  localePrefix,
  locales
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
