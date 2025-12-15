import type React from "react"
import type { Metadata } from "next"
import { Poiret_One, Space_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poiretOne = Poiret_One({ 
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif"
})

const spaceMono = Space_Mono({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans"
})

export const metadata: Metadata = {
  title: "Fillippo Heladería | Dulzura que inspira sonrisas",
  description:
    "Heladería en Ramos Mejía con amplia variedad de sabores tradicionales y creativos. Calidad, creatividad y servicio excepcional.",
  generator: "",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${spaceMono.variable} ${poiretOne.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
