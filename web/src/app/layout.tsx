import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"
import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"

import { cn } from "@/shared/lib/utils"
import { ThemeProvider } from "@/shared/components/Themes/theme-provider"
import { ModeToggle } from "@/shared/components/mode-toggle/mode-toggle"

const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Titan Advertisiment",
  description: "Advertisiment",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={cn(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<ThemeProvider
					attribute='class'
					defaultTheme='system'
					enableSystem
					disableTransitionOnChange
				>
					{children}
					<ModeToggle />
				</ThemeProvider>
			</body>
		</html>
	)
}
