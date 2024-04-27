import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/shared/lib/utils";
import { ThemeProvider } from "@/shared/components/Themes/theme-provider";
import NextTopLoader from "nextjs-toploader";
import Header from "@/widgets/header/header";
import MainLayout from "@/shared/components/maleculas/main-layout";
import WannaMobile from "@/widgets/wanna-mobile/wanna-mobile";
import ApolloProviderClient from "@/shared/Providers/ApolloProvider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Titan Advertisement",
  applicationName: "Titan Advertisement",
  description: "Advertisement social network",
  keywords: [
    "Advertisement",
    "Advertisement Titan",
    "Titan Advertisement",
    "Project Titan",
    "Titan",
  ],
  authors: [{ name: "Nikita Yatsun", url: "https://sh1woo.vercel.app/" }],
  creator: "Nikita Yatsun",
  publisher: "Titan",
  openGraph: {
    title: "Titan Advertisement",
    description:
      "Social network with a bias on advertising, and zarbotok in the Internet.",
    images: "https://titanproject.top/cat.jpeg",
    creators: ["Nikita Yatsun", "Titan Project"],
    url: "https://titanproject.top/",

  },
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
