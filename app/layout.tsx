import type { Metadata } from "next";
import SplashScreen from "@/components/ui/SplashScreen/SplashScreenLoader";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Meridian Motors — A Considered Collection",
  description: "The finest pre-owned automobiles in Lagos — sourced, inspected, and presented with singular intention.",
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
        {/*
          Runs synchronously before React boots.
          On a first visit: hides the entire page so there is zero
          flash of content before the splash overlay mounts.
          On repeat visits: does nothing — page renders normally.
        */}
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
    </html>
  );
}
