import SvgHover from "./SvgHover";
import Dock from "./Dock";
import Socials from "./Socials";

export default function Down() {
  return (
    <section className="px-10 pt-20 md:px-20 lg:px-56">

    
      <div className="flex pb-11 flex-col">
        <div className="flex flex-row justify-between">
          <h6 className="text-xs pb-3 ">
            {" "}
            <span className="text-[#4447A9]"> Lab.. </span>
          </h6>
        </div>

        <div className="flex flex-row">
          <h4 className="text-base text-justify ">
            A collection of side-quests I explore from time to time to learn,
            experiment with new technologies, and just build anything.{" "}
            <span className="underline text-sm underline-offset-2">
              Visit Lab
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
