import { getListData } from "../../sanity/lib/fetch";

export default async function List() {
  const listData = await getListData();

  return (
    <section className="px-10 pt-20 md:px-20 lg:px-56">
      {listData.map((item, index) => (
        <div key={item._id} className="flex pb-9 flex-col">
          <div className="flex flex-row gap-1">
            <h6 className="text-xs pb-3 ">
              {" "}
              <span className="text-[#4447A9]"> [{String(index + 1).padStart(2, '0')}] </span>
            </h6>
          </div>
          <div className="pb-3">
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

          <div className="flex gap-2 items-baseline">
            <h4 className={`text-base ${item.completed ? 'line-through opacity-60' : ''}`}>
              {item.text}
            </h4>
            {item.completed && item.completedDate && (
              <>
                <span className="italic text-xs">• Completed</span>
                <span className="text-[#4447A9] text-xs">{item.completedDate}</span>
              </>
            )}
          </div>
        </div>
      ))}
    </section>
  );
}
