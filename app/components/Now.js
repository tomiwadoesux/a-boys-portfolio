import { getNowData } from "../../sanity/lib/fetch";

export default async function Now() {
  const nowData = await getNowData();

  return (
    <section className="px-16 pt-20 lg:px-56">
      {nowData.map((item, index) => (
        <div key={index} className="flex pb-11 flex-col">
          <div className="flex flex-row gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#027864"
              width="16"
              height="16"
              className="icon small"
              aria-hidden="true"
            >
              <path d="M5.99805 3C9.48787 3 12.3812 5.55379 12.9112 8.8945C14.0863 7.72389 15.7076 7 17.498 7H21.998V9.5C21.998 13.0899 19.0879 16 15.498 16H12.998V21H10.998V13H8.99805C5.13205 13 1.99805 9.86599 1.99805 6V3H5.99805ZM19.998 9H17.498C15.0128 9 12.998 11.0147 12.998 13.5V14H15.498C17.9833 14 19.998 11.9853 19.998 9.5V9ZM5.99805 5H3.99805V6C3.99805 8.76142 6.23662 11 8.99805 11H10.998V10C10.998 7.23858 8.75947 5 5.99805 5Z" />
            </svg>

            <h6 className="text-xs pb-3 ">
              {" "}
              <span className="italic"> Planted On</span>{" "}
              <span className="text-[#027864]"> {item.date} </span>
            </h6>
          </div>

          <h4 className="text-base">{item.text}</h4>
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
                stroke-width="1"
              />
            </svg>
          </div>
        </div>
      ))}
    </section>
  );
}
