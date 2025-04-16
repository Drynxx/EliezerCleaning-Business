import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: "Eliezer Cleaning | Servicii Profesionale de Curățenie în Satu Mare",
  description:
    "Servicii premium de curățenie pentru case, apartamente și spații comerciale în Satu Mare. Curățenie cu aburi, detailing auto și soluții personalizate.",
  keywords:
    "curățenie, servicii curățenie, curățenie Satu Mare, curățenie cu aburi, detailing auto, curățenie profesională, firmă curățenie",
  authors: [{ name: "Eliezer Cleaning" }],
  creator: "Eliezer Cleaning",
  publisher: "Eliezer Cleaning",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://eliezercleaning.ro"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Eliezer Cleaning | Servicii Profesionale de Curățenie în Satu Mare",
    description:
      "Servicii premium de curățenie pentru case, apartamente și spații comerciale în Satu Mare. Curățenie cu aburi, detailing auto și soluții personalizate.",
    url: "https://eliezercleaning.ro",
    siteName: "Eliezer Cleaning",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 1200,
        alt: "Eliezer Cleaning - Servicii Profesionale de Curățenie",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eliezer Cleaning | Servicii Profesionale de Curățenie în Satu Mare",
    description: "Servicii premium de curățenie pentru case, apartamente și spații comerciale în Satu Mare.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'