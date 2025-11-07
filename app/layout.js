import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { DescriptionProvider } from "./components/DescriptionProvider";
import PersistentBody from "./components/PersistentBody";
import Headd from "./components/Headd";
import Socials from "./components/Socials";
import GsapInitializer from "./components/GsapInitializer";
import NavigationPauseWrapper from "./components/NavigationPauseWrapper";
import SmoothScroll from "./components/SmoothScroll";
import SchemaMarkup from "./components/SchemaMarkup";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL('https://ayotomcs.me'),
  title: {
    default: "Wale-Durojaye Ayotomiwa | Design Engineer Portfolio",
    template: "%s | Ayotomcs"
  },
  description: "Design Engineer and Frontend Developer based in Nigeria & USA. Specializing in Next.js, React, and modern web experiences.",
  verification: {
    google: "your-google-verification-code", // Add your Google Search Console verification code
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <SchemaMarkup />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
        style={{ backgroundColor: 'var(--foreground)' }}
      >
        <GsapInitializer />
        <SmoothScroll />
        <NavigationPauseWrapper />
        <DescriptionProvider>
          {/* Rounded border frame */}
          {/* <div className="fixed inset-2 border-2 rounded-xl md:rounded-2xl  pointer-events-none z-[9999]" style={{ borderColor: 'var(--background)' }}></div> */}

          <div className="fixed  inset-1.5 rounded-xl md:rounded-2xl  overflow-hidden z-10" style={{ backgroundColor: 'var(--background)' }}>
            <div id="main-scroll-container" className="h-full w-full overflow-y-auto overflow-x-hidden">
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
