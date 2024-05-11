import { ApolloWrapperServer } from "@/features/graphql/server/apollo-wrapper-server";
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
    <ApolloWrapperServer>
      <main className="flex h-[100vh] w-[100vw]">{children}</main>
    </ApolloWrapperServer>
  );
}
