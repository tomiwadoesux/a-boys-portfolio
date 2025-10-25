import PageConfig from "../components/PageConfig";
import GuestbookClient from "../components/Guestbook/GuestbookClient";
import { getGuestbookEntries } from "../../sanity/lib/fetch";

// Metadata for SEO
export const metadata = {
  title: "Guestbook | Ayotomcs",
  description: "Sign in my digital guestbook.",
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
