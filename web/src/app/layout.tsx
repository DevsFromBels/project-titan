import type { Metadata } from "next"
import { Inter as FontSans } from "next/font/google"
import "./globals.css"

import { cn } from "@/shared/lib/utils"
import NextTopLoader from "nextjs-toploader"

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
				<NextTopLoader
					color='#00AA00'
					initialPosition={0.6}
					showSpinner={false}
				/>
				{children}
			</body>
		</html>
	)
}
