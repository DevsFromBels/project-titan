import ApolloProviderClient from "@/shared/Providers/ApolloProvider";
import { i18nLocales } from "@/shared/constants/i18n-locales";
import { unstable_setRequestLocale } from "next-intl/server";

export function generateStaticParams() {
  return i18nLocales.map((locale) => ({ locale }));
}

export default function ProfileLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return (
      <ApolloProviderClient>
        <main className="flex h-[100vh] w-[100vw]">{children}</main>
      </ApolloProviderClient>
  );
}
