import "./globals.css";
import { DescriptionProvider } from "./components/DescriptionProvider";
import PersistentBody from "./components/PersistentBody";
import Headd from "./components/Headd";
import Socials from "./components/Socials";
import GsapInitializer from "./components/GsapInitializer";
import NavigationPauseWrapper from "./components/NavigationPauseWrapper";
import SmoothScrollWrapper from "./components/SmoothScrollWrapper";
import SchemaMarkup from "./components/SchemaMarkup";
import LoadingOverlay from "./components/LoadingOverlay";
import { Analytics } from "@vercel/analytics/next";

export const metadata = {
  metadataBase: new URL("https://ayotomcs.me"),
  title: {
    default: "Wale-Durojaye Ayotomiwa | Design Engineer Portfolio",
    template: "%s | Ayotomcs",
  },
  description:
    "Design Engineer and Frontend Developer based in USA. Specializing in Next.js, React, and modern web experiences.",
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.bunny.net" />
        <link
          href="https://fonts.bunny.net/css?family=itim:400"
          rel="stylesheet"
        />
        <link
          href="https://fonts.bunny.net/css?family=actor:400"
          rel="stylesheet"
        />
        <SchemaMarkup />
      </head>
      <body
        className="antialiased"
        style={{ backgroundColor: "var(--foreground)" }}
      >
        <GsapInitializer />
        <LoadingOverlay />
        {/* <SmoothScrollWrapper /> */}
        <NavigationPauseWrapper />
        <DescriptionProvider>
          {/* Rounded border frame */}
          {/* <div className="fixed inset-2 border-2 rounded-xl md:rounded-2xl  pointer-events-none z-[9999]" style={{ borderColor: 'var(--background)' }}></div> */}

          <div
            className="fixed  inset-1.5 rounded-xl md:rounded-2xl  overflow-hidden z-10"
            style={{ backgroundColor: "var(--background)" }}
          >
            <div
              id="main-scroll-container"
              className="h-full w-full overflow-y-auto overflow-x-hidden"
            >
              <Headd />
              <PersistentBody />
              {children}
              <Socials />
            </div>
          </div>
        </DescriptionProvider>
        <Analytics />
      </body>
    </html>
  );
}
