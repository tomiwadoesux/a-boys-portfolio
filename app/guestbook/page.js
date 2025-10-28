import PageConfig from "../components/PageConfig";
import GuestbookClient from "../components/Guestbook/GuestbookClient";
import { getGuestbookEntries } from "../../sanity/lib/fetch";

// Metadata for SEO
export const metadata = {
  title: "Portfolio Guestbook & Visitor Messages",
  description: "Sign my digital guestbook! Leave your mark, share feedback, and connect with other visitors. View messages from developers, designers, and clients worldwide.",
  keywords: ["Portfolio Guestbook", "Visitor Messages", "Design Community", "Developer Network", "Testimonials", "Client Feedback"],
  openGraph: {
    title: "Guestbook | Wale-Durojaye Ayotomiwa",
    description: "Sign my digital guestbook and leave your mark",
    url: "https://ayotomcs.me/guestbook",
    images: ["/opengraph.png"],
  },
};

// Prerender at build time and revalidate every minute for fresh entries
export const revalidate = 60;
export const dynamic = 'force-static';

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div>
      <PageConfig
        activePage="/guestbook"
        description={
          <>
            Sign in my digital{" "}
            <span className="text-[#4447A9]">Guestbook</span>
          </>
        }
      />
      <GuestbookClient initialEntries={entries} />
      <div className=" grid-cols-4 grid ">

      </div>
    </div>
  );
}
