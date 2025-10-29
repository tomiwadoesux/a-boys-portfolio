import PageConfig from "./components/PageConfig";
import Front from "./components/Front";
import ProjectGridWrapper from "./components/ProjectGridWrapper";
import Socials from "./components/Socials";
import Down from "./components/Down"
import MusicWidgetWrapper from "./components/MusicWidgetWrapper";

export const metadata = {
  title: "Wale-Durojaye Ayotomiwa | Design Engineer & Frontend Developer Portfolio",
  description:
    "Next.js developer portfolio featuring high-performance, SEO-optimized, and visually dynamic web experiences powered by GSAP animations and modern design. Based in Nigeria & USA.",
  keywords: ["Design Engineer", "Software Design Engineer", "UI/UX Designer", "Frontend Engineer", "Next.js Developer", "React Developer", "Portfolio", "Nigeria", "USA", "GSAP Animations", "Web Development"],
  authors: [{ name: "Wale-Durojaye Ayotomiwa" }],
  creator: "Wale-Durojaye Ayotomiwa",
  openGraph: {
    title: "Wale-Durojaye Ayotomiwa | Design Engineer Portfolio",
    description: "Creative Next.js developer portfolio showcasing high-performance web experiences with modern design and animations.",
    url: "https://ayotomcs.me",
    siteName: "Ayotomcs Portfolio",
    images: [
      {
        url: "https://ayotomcs.me/images/opengraph.png",
        width: 1200,
        height: 630,
        alt: "Wale-Durojaye Ayotomiwa - Design Engineer Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wale-Durojaye Ayotomiwa | Design Engineer Portfolio",
    description: "Creative Next.js developer portfolio showcasing high-performance web experiences.",
    images: ["https://ayotomcs.me/images/opengraph.png"],
    creator: "@ayotomcs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

// Revalidate every hour
export const revalidate = 3600;

export default function Home() {
  return (
    <div>
      {/* SEO: Hidden h1 for better semantic structure */}
      <h1 className="sr-only hidden">Wale-Durojaye Ayotomiwa - Design Engineer, Frontend Developer & UI/UX Designer Portfolio</h1>
      <PageConfig
        description={
          <>
            A Design Engineer Now in{" "}
            <span className="text-[#4447A9]">Abuja, Nigeria</span>
          </>
        }
        activePage="/"
      />
      <Front />
  
      <ProjectGridWrapper filter="featured" />
      <Down/>
      <MusicWidgetWrapper />
      {/* <Socials /> */}
    </div>
  );
}
