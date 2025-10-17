import Body from "../components/Body";
import GuestbookClient from "../components/Guestbook/GuestbookClient";
import { getGuestbookEntries } from "../../sanity/lib/fetch";

export default async function GuestbookPage() {
  const entries = await getGuestbookEntries();

  return (
    <div>
      <Body
        description={
          <>
            Leave your mark in my digital{" "}
            <span className="text-[#027864]">Guestbook</span>
          </>
        }
      />
      <GuestbookClient initialEntries={entries} />
    </div>
  );
}
