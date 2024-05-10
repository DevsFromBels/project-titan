import { notFound, redirect } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { i18nLocales } from "@/shared/constants/i18n-locales";

export default getRequestConfig(async ({ locale }) => {
  if (!i18nLocales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./shared/messages/${locale}.json`)).default,
  };
});
