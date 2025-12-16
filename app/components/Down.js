import Link from "next/link";
import SvgHover from "./SvgHover";
export default function Down() {
  return (
    <section className="px-7 pt-8 md:pt-11 md:px-20 lg:px-56">
      <div className="flex pb-8 md:pb-11 flex-col">
        <div className="flex flex-row gap-1">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 15.6667H4.83333C4.74493 15.6667 4.66014 15.6315 4.59763 15.569C4.53512 15.5065 4.5 15.4217 4.5 15.3333C4.5 15.2449 4.53512 15.1601 4.59763 15.0976C4.66014 15.0351 4.74493 15 4.83333 15H13C13.1326 15 13.2598 14.9473 13.3536 14.8536C13.4473 14.7598 13.5 14.6326 13.5 14.5V2.33333C13.5 2.24493 13.5351 2.16014 13.5976 2.09763C13.6601 2.03512 13.7449 2 13.8333 2C13.9217 2 14.0065 2.03512 14.069 2.09763C14.1315 2.16014 14.1667 2.24493 14.1667 2.33333V14.5C14.1667 14.8094 14.0438 15.1062 13.825 15.325C13.6062 15.5437 13.3094 15.6667 13 15.6667Z"
              fill="#4447A9"
            />
            <path
              d="M10.1562 0.34375C11.2608 0.34375 12.1562 1.23918 12.1562 2.34375V12C12.1562 13.1046 11.2608 14 10.1562 14H3.8125C2.70793 14 1.8125 13.1046 1.8125 12V2.34375C1.8125 1.23918 2.70793 0.34375 3.8125 0.34375H10.1562ZM9.78418 6.9082C9.51761 6.64182 9.11817 6.6419 8.85156 6.9082L7.85156 7.9082L5.45117 7.375C5.11789 7.30834 4.71812 7.50832 4.65137 7.9082C4.5847 8.24154 4.78457 8.64134 5.18457 8.70801L6.71777 9.04199L6.45117 9.30859C6.11795 9.64173 5.58467 9.70851 5.11816 9.50879L4.91797 9.44141C4.58469 9.3081 4.18418 9.44143 4.05078 9.70801C3.91745 10.0413 4.05143 10.4416 4.38477 10.6416L4.51758 10.708C4.85091 10.908 5.25137 10.9746 5.65137 10.9746C6.31792 10.9745 6.91816 10.7078 7.38477 10.2412L9.78418 7.8418C10.0508 7.57513 10.0508 7.17487 9.78418 6.9082ZM5.31738 3.375C4.91759 3.37517 4.65137 3.64212 4.65137 4.04199C4.65151 4.44169 4.9177 4.70784 5.31738 4.70801H8.65137C9.05111 4.70789 9.31724 4.44172 9.31738 4.04199C9.31738 3.64208 9.05122 3.37512 8.65137 3.375H5.31738Z"
              fill="#4447A9"
            />
          </svg>

          <h2 className="text-xs pb-3 ">
            <span className=" text-[#4447A9]">GuestBook.. </span>
          </h2>
        </div>

        <div className="flex ">
          <h4 className="text-sm md:text-base text-justify ">
         Leave your mark. A space for visitors to say hello, where everyone gets their own unique, custom-generated stamp :)
            <span>
              <Link href="/guestbook">
                <h4 className="underline text-[#4447A9] text-sm underline-offset-2">
                  Sign my guestbook
                </h4>
              </Link>
            </span>
          </h4>
        </div>

        <div className="pt-2">
          <svg
            className="w-full h-px"
            viewBox="0 0 100 1"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="0"
              y1="0.5"
              x2="100"
              y2="0.5"
              stroke="black"
              strokeWidth="1"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
