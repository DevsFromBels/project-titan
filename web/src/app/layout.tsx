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
import DetectNavigation from "@/widgets/(naivigation)/detect-navigation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Titan - Advertisement Social Network",
  description:
    "Discover the premier advertising social network for connecting businesses and customers.",
  keywords: ["Advertising", "Social Network", "Titan", "Online Marketing"],
  authors: [{ name: "Titan" }],
  creator: "Titan",
  publisher: "Titan",
  robots: "index, follow",
  openGraph: {
    title: "Titan",
    description: "Titan - The leading advertisement social network.",
    images: "https://titanproject.top/cat.jpeg",
    creators: ["Titan"],
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
        suppressHydrationWarning={true}
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
            <MainLayout>
              <DetectNavigation />
              {children}
            </MainLayout>

            <WannaMobile />
          </ThemeProvider>
        </ApolloProviderClient>
      </body>
    </html>
  );
}
