import SvgHover from "./SvgHover";
import Dock from "./Dock";
import Socials from "./Socials";

export default function Front() {
  return (
    <section className="px-10 pt-16 md:pt-20 md:px-20 lg:px-56">
      {/* <div className="w-full h-44">
        <SvgHover />
      </div> */}
      {/* <Dock /> */}
      <div className="flex  pb-8 md:pb-11 flex-col">
        <div className="flex flex-row gap-1">
          <h6 className="text-xs text-[#4447A9] pb-3 ">
            {" "}
            Who is Wale-Durojaye Ayotomiwa?.
          </h6>
        </div>

        <h4 className="text-justify text-base ">
          {" "}
          I am a Design engineer who prototypes and ships designs you can feel,
          comfortable moving from Figma
          <span className="inline-flex items-center mx-1">
            <svg
              width="8"
              height="12"
              viewBox="0 0 12 18"
              fill="none"
              className="inline-block  align-middle  "
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.12598 18C4.7588 18 6.08398 16.6748 6.08398 15.042V12.084H3.12598C1.49316 12.084 0.167969 13.4092 0.167969 15.042C0.167969 16.6748 1.49316 18 3.12598 18Z"
                fill="#10CF82"
              />
              <path
                d="M0.167969 9.12597C0.167969 7.49316 1.49316 6.16797 3.12598 6.16797H6.08398V12.084H3.12598C1.49316 12.084 0.167969 10.7588 0.167969 9.12597Z"
                fill="#A15AFE"
              />
              <path
                d="M0.167969 3.20996C0.167969 1.57714 1.49316 0.251953 3.12598 0.251953H6.08398V6.16797H3.12598C1.49316 6.16797 0.167969 4.84278 0.167969 3.20996Z"
                fill="#F24E1D"
              />
              <path
                d="M6.08398 0.251953H9.04199C10.6748 0.251953 12 1.57714 12 3.20996C12 4.84278 10.6748 6.16796 9.04199 6.16796H6.08398V0.251953Z"
                fill="#FF7262"
              />
              <path
                d="M12 9.12597C12 10.7588 10.6748 12.084 9.04199 12.084C7.40917 12.084 6.08398 10.7588 6.08398 9.12597C6.08398 7.49316 7.40917 6.16797 9.04199 6.16797C10.6748 6.16797 12 7.49316 12 9.12597Z"
                fill="#1ABCFE"
              />
            </svg>
          </span>
          to production. I have a soft spot for micro‑interactions that make
          products feel effortless, I build screens in Next.js
          <span className="inline-flex items-center mx-1">
            <svg
              width="13"
              height="13"
              viewBox="0 0 18 18"
              fill="none"
              className="inline-block  align-middle  "
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#front-nextjs-clip)">
                <path
                  d="M8.41056 0.00484386C8.37185 0.00836241 8.24868 0.0206773 8.13783 0.0294737C5.58123 0.259938 3.18651 1.63921 1.66979 3.75913C0.82522 4.93784 0.285044 6.27489 0.0809384 7.6911C0.00879765 8.18546 0 8.33148 0 9.00176C0 9.67204 0.00879765 9.81806 0.0809384 10.3124C0.570088 13.692 2.97537 16.5314 6.23754 17.5835C6.8217 17.7717 7.43754 17.9002 8.13783 17.9776C8.41056 18.0075 9.58944 18.0075 9.86217 17.9776C11.071 17.8439 12.095 17.5448 13.105 17.0293C13.2598 16.9502 13.2897 16.929 13.2686 16.9115C13.2545 16.9009 12.5947 16.016 11.8029 14.9463L10.3636 13.0023L8.56012 10.3335C7.56774 8.8663 6.75132 7.66647 6.74428 7.66647C6.73724 7.66472 6.73021 8.85046 6.72669 10.2983C6.72141 12.8335 6.71965 12.9355 6.68798 12.9953C6.64223 13.0815 6.60704 13.1167 6.53314 13.1554C6.47683 13.1836 6.42757 13.1888 6.16188 13.1888H5.85748L5.77654 13.1378C5.72375 13.1044 5.68504 13.0604 5.65865 13.0094L5.6217 12.9302L5.62522 9.40288L5.6305 5.87378L5.68504 5.80516C5.7132 5.76822 5.77302 5.72072 5.81525 5.69785C5.88739 5.66266 5.91554 5.65915 6.21994 5.65915C6.57889 5.65915 6.63871 5.67322 6.73196 5.77526C6.75836 5.80341 7.7349 7.27416 8.90323 9.04574C10.0716 10.8173 11.6692 13.2363 12.454 14.4238L13.8792 16.5825L13.9513 16.535C14.59 16.1198 15.2657 15.5287 15.8006 14.9129C16.939 13.6058 17.6727 12.0119 17.9191 10.3124C17.9912 9.81806 18 9.67204 18 9.00176C18 8.33148 17.9912 8.18546 17.9191 7.6911C17.4299 4.31154 15.0246 1.47208 11.7625 0.420032C11.1871 0.233549 10.5748 0.105122 9.88856 0.0277144C9.71965 0.0101217 8.5566 -0.00923031 8.41056 0.00484386ZM12.095 5.44803C12.1795 5.49025 12.2481 5.57118 12.2727 5.65563C12.2868 5.70137 12.2903 6.67952 12.2868 8.88389L12.2815 12.0471L11.7238 11.1921L11.1642 10.3371V8.03768C11.1642 6.5511 11.1713 5.71544 11.1818 5.67498C11.21 5.57646 11.2716 5.49905 11.356 5.45331C11.4282 5.41637 11.4545 5.41285 11.7308 5.41285C11.9912 5.41285 12.037 5.41637 12.095 5.44803Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="front-nextjs-clip">
                  <rect width="18" height="18" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          with styling shaped by Tailwind
          <span className="inline-flex items-center justify-center">
            <svg
              width="13"
              height="13"
              viewBox="0 0 22 15"
              fill="none"
              className="inline-block align-middle"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#front-tailwind-clip)">
                <mask
                  id="front-tailwind-mask"
                  style={{ maskType: "luminance" }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="22"
                  height="15"
                >
                  <path d="M0 0H22V14.7273H0V0Z" fill="white" />
                </mask>
                <g mask="url(#front-tailwind-mask)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M11 0C8.06667 0 6.23333 1.63636 5.5 4.90909C6.6 3.27273 7.88333 2.65909 9.35 3.06818C10.1868 3.30136 10.7849 3.97909 11.4469 4.72864C12.5253 5.95 13.7736 7.36364 16.5 7.36364C19.4333 7.36364 21.2667 5.72727 22 2.45455C20.9 4.09091 19.6167 4.70455 18.15 4.29545C17.3132 4.06227 16.7151 3.38455 16.0531 2.635C14.9747 1.41364 13.7264 0 11 0ZM5.5 7.36364C2.56667 7.36364 0.733333 9 0 12.2727C1.1 10.6364 2.38333 10.0227 3.85 10.4318C4.68681 10.6655 5.28489 11.3427 5.94693 12.0923C7.02533 13.3136 8.27363 14.7273 11 14.7273C13.9333 14.7273 15.7667 13.0909 16.5 9.81818C15.4 11.4545 14.1167 12.0682 12.65 11.6591C11.8132 11.4259 11.2151 10.7482 10.5531 9.99864C9.47467 8.77727 8.22637 7.36364 5.5 7.36364Z"
                    fill="#38BDF8"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="front-tailwind-clip">
                  <rect width="22" height="15" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </span>
          . And then it all make sense.
        </h4>
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
      <div className="flex pb-8 md:pb-11 flex-col">
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
            <span className="underline text-[#4447A9] text-sm underline-offset-2">
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
