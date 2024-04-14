import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/shared/lib/utils";
import { ThemeProvider } from "@/shared/components/Themes/theme-provider";
import NextTopLoader from "nextjs-toploader";
import Header from "@/shared/components/organisms/header/header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Titan Advertisiment",
  description: "Advertisiment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
