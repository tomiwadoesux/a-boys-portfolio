

export default function Down() {
  return (
    <section className="px-10 pt-16 md:pt-20 md:px-20 lg:px-56">
   
      <div className="flex pb-8 md:pb-11 flex-col">
        <div className="flex flex-row justify-between">
          <h6 className="text-xs pb-3 ">
            {" "}
            <span className="text-[#4447A9]"> GuestBook.. </span>
          </h6>
        </div>

        <div className="flex flex-row">
          <h4 className="text-base text-justify ">
        Is Where Visitors Sign and leave their Mark on my website, Everyone has a unique stamp :) 
           {}  <span className="underline text-[#4447A9] text-sm underline-offset-2">
               sign my guestbook
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
