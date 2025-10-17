import Body from "../components/Body";
import GuestbookClient from "../components/Guestbook/GuestbookClient";
import { getGuestbookEntries } from "../../sanity/lib/fetch";

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div>
      <Body
        activePage="/guestbook"
        description={
          <>
            Leave your mark in my digital{" "}
            <span className="text-[#4447A9]">Guestbook</span>
          </>
        }
      />
      <GuestbookClient initialEntries={entries} />
    </div>
  );
}
