import {createSharedPathnamesNavigation} from 'next-intl/navigation';
import { i18nLocales } from './shared/constants/i18n-locales';
 
export const locales = i18nLocales;
export const localePrefix = 'always'; // Default
 
export const {Link, redirect, usePathname, useRouter} =
  createSharedPathnamesNavigation({locales, localePrefix});