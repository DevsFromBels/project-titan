import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/shared/lib/utils";
import { ThemeProvider } from "@/shared/components/Themes/theme-provider";
import NextTopLoader from "nextjs-toploader";
import Header from "@/shared/components/organisms/header/header";
import MainLayout from "@/shared/components/maleculas/main-layout";
import WannaMobile from "@/shared/components/organisms/wanna-mobile/wanna-mobile";
import ApolloProviderClient from "@/shared/Providers/ApolloProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Titan Advertisiment",
  description: "Advertisiment",
  openGraph: {
    title: "Titan Advertisiment",
    directors: "Социальная сеть с уклоном на рекламу, и зарботок в интернете.",
    images: "https://titanproject.com/cat.jpeg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ApolloProviderClient>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader
              color="#00AA00"
              initialPosition={0.6}
              showSpinner={false}
            />
            <Header />
            <MainLayout>{children}</MainLayout>
            <WannaMobile />
          </ThemeProvider>
        </ApolloProviderClient>
      </body>
    </html>
  );
}
