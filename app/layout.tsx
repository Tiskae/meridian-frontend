import type { Metadata } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import SplashScreen from "@/components/ui/SplashScreen/SplashScreenLoader";
import "./globals.scss";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

export const metadata: Metadata = {
  metadataBase: new URL("https://meridian.tiskae.dev"),
  title: {
    default: "Meridian Motors: Luxury Cars in Lagos",
    template: "%s",
  },
  description:
    "Meridian Motors is Lagos's foremost curated luxury car dealership, presenting the finest brand new and clean foreign-used automobiles on Victoria Island. Sourced, inspected, and presented with singular intention since 2018.",
  keywords: [
    "luxury cars Lagos",
    "luxury car dealership Lagos",
    "foreign used cars Lagos",
    "buy luxury car Nigeria",
    "premium cars Victoria Island",
    "clean used cars Lagos",
    "Meridian Motors",
  ],
  authors: [{ name: "Ibrahim Adedokun", url: "https://tiskae.dev" }],
  creator: "Ibrahim Adedokun",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: "https://meridian.tiskae.dev",
    siteName: "Meridian Motors",
    title: "Meridian Motors: Luxury Cars in Lagos",
    description:
      "The finest brand new and clean foreign-used automobiles in Lagos. Curated, inspected, and presented with singular intention on Victoria Island.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Meridian Motors: Luxury Cars in Lagos",
    description:
      "The finest brand new and clean foreign-used automobiles in Lagos. Curated, inspected, and presented with singular intention on Victoria Island.",
    site: "@tiskae1",
    creator: "@tiskae1",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(!sessionStorage.getItem('meridian_splash_seen'))document.documentElement.style.visibility='hidden'}catch(e){}`,
          }}
        />
      </head>
      <body>
        <SplashScreen />
        {children}
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
