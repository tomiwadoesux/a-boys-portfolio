import PageConfig from "../components/PageConfig";
import GuestbookClient from "../components/Guestbook/GuestbookClient";
import { getGuestbookEntries } from "../../sanity/lib/fetch";

// Metadata for SEO
export const metadata = {
  title: "Guestbook | Design Engineer Portfolio",
  description: "Leave your mark in my digital guestbook. Share your thoughts and connect.",
};

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div>
      <PageConfig
        activePage="/guestbook"
        description={
          <>
            Leave your mark in my digital{" "}
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
