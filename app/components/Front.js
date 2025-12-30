import Link from "next/link";
import AsciiMask from "./AsciiMask";

export default function Front() {
  return (
    <section className="px-7 pt-16 md:pt-20 md:px-20 lg:px-56">
      {/* <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <AsciiMask />
      </div> */}

      <div className="flex  pb-8 md:pb-11 flex-col">
        <div className="flex flex-row gap-1">
          <svg
            width="14"
            height="13"
            viewBox="0 0 16 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_230_57)">
              <path
                d="M14.1177 8.213L12.7059 8.213L12.7059 6.78738L13.1765 6.78738L13.1765 4.52316L13.6471 4.52316L13.6471 2.21701L13.1765 2.21701L13.1765 1.75578L12.2353 1.75578L12.2353 1.25262L10.3743 1.25262L10.3743 0.812351L5.66845 0.812351L5.66845 1.25262L3.7861 1.25262L3.7861 1.75578L2.86631 1.75578L2.86631 2.19604L2.37433 2.19604L2.37433 4.46026L2.86631 4.46026L2.86631 6.80834L3.29412 6.80834L3.29412 8.19203L1.90375 8.19203L1.90375 8.65326L0.983959 8.65326L0.983959 9.13545L0.47059 9.13545L0.47059 9.59668L1.90995e-06 9.59668L1.78898e-06 10.9804L0.534761 10.9804L0.534761 11.4416L0.983959 11.4416L0.983959 11.8819L1.43316 11.8819L1.43316 12.3431L1.90375 12.3431L1.90375 12.7834L2.86631 12.7834L2.86631 13.2656L3.80749 13.2656L3.80749 13.7058L5.21925 13.7058L5.21925 14.209L10.8449 14.209L10.8449 13.7478L12.2353 13.7478L12.2353 13.3075L13.1979 13.3075L13.1979 12.8253L14.1176 12.8253L14.1176 12.385L14.5882 12.385L14.5882 11.9028L15.0802 11.9028L15.0802 11.4416L15.5294 11.4416L15.5294 10.9384L16 10.9384L16 9.61765L15.5294 9.61765L15.5294 9.13546L15.0802 9.13545L15.0802 8.69519L14.1177 8.69519L14.1177 8.213Z"
                fill="#4447A9"
              />
              <path
                d="M3.85005 8.63216L3.2939 8.63216L3.2939 10.54L4.25646 10.54L4.25646 11.0012L5.19764 11.0012L5.19764 11.4834L10.8661 11.4834L10.8661 11.0431L11.8073 11.0431L11.8073 10.5609L12.7271 10.5609L12.7271 8.63216L12.1923 8.63216L12.1923 9.11435L11.7217 9.11435L11.7217 9.55462L10.3099 9.55462L10.3099 10.0368L5.7324 10.0368L5.7324 9.57558L4.32064 9.57558L4.32064 9.09339L3.85005 9.09339L3.85005 8.63216Z"
                fill="white"
              />
            </g>
            <defs>
              <clipPath id="clip0_230_57">
                <rect
                  width="16"
                  height="15"
                  fill="white"
                  transform="translate(16 15) rotate(-180)"
                />
              </clipPath>
            </defs>
          </svg>

          <h2 className="text-xs pb-3 ">
            <span className=" text-[#4447A9]"> Wale-Durojaye Ayotomiwa.. </span>
          </h2>
        </div>

        <p className="text-justify text-sm md:text-base ">
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
        </p>
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
        <div className="flex flex-row gap-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 512 512"
            fill="#4447A9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path
                d="M432.9,458.9V131.3c0-28.9-23.3-52.1-52.1-52.1H53c-28.9,0-52.1,23.3-52.1,52.1v328.6   C0.9,488.7,24.2,512,53,512h328.6C409.6,512,432.9,487.8,432.9,458.9L432.9,458.9z M135,314.6l55.9,79.1l81.9-118.2l108,157.3H53   L135,314.6z"
                fill="#4447A9"
              />
              <path
                d="M458.9,0H131.2c-28.9,0-52.1,23.3-52.1,52.1v6.5h321.2c28.9,0,52.1,23.3,52.1,52.1v322.1h6.5   c28.9,0,52.1-23.3,52.1-52.1V52.1C512,23.3,488.7,0,458.9,0z"
                fill="#4447A9"
              />
            </g>
          </svg>

          <h2 className="text-xs pb-3 ">
            <span className=" text-[#4447A9]"> PhotoBook.. </span>
          </h2>
        </div>

        <div className="flex flex-row">
          <p className=" text-sm flex flex-col md:text-base text-justify ">
           An archive of photographs I share here, they are added over time. Less about perfection.
            <span>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://photos.ayotomcs.me/"
              >
                <span className="underline text-[#4447A9] text-sm underline-offset-2">
                  PhotoBook
                </span>
              </a>
            </span>
          </p>
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
      <div className="flex pb-0  flex-col">
        <div className="flex flex-row gap-1">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="#4447A9"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              clipRule="evenodd"
              d="M13.1457 11.9998C11.5097 7.9142 9.60012 6.8374 9.60012 4.7998V2.3998H10.0001C10.1062 2.3998 10.208 2.35766 10.283 2.28265C10.358 2.20763 10.4001 2.10589 10.4001 1.9998V1.1998C10.4001 1.09372 10.358 0.991976 10.283 0.916962C10.208 0.841947 10.1062 0.799805 10.0001 0.799805H6.00012C5.89404 0.799805 5.79229 0.841947 5.71728 0.916962C5.64227 0.991976 5.60012 1.09372 5.60012 1.1998V1.998C5.60012 2.10589 5.64227 2.20763 5.71728 2.28265C5.79229 2.35766 5.89404 2.3998 6.00012 2.3998H6.40012V4.7998C6.40012 6.8374 4.49052 7.9142 2.85452 11.9998C2.33372 13.2998 0.996122 15.1998 8.00012 15.1998C15.0041 15.1998 13.6665 13.2998 13.1457 11.9998ZM11.8521 13.4006C11.2905 13.5686 10.1729 13.7598 8.00012 13.7598C5.82732 13.7598 4.70972 13.5686 4.14812 13.4006C3.94892 13.3414 3.87132 13.1102 3.94172 12.8982C4.11772 12.3622 4.44972 11.4358 5.07052 10.4014C6.58732 7.8742 8.16092 10.799 9.47052 10.799C10.7801 10.799 10.4209 9.5502 10.9297 10.4014C11.3979 11.189 11.7766 12.0264 12.0585 12.8982C12.1289 13.1102 12.0513 13.3406 11.8521 13.4006Z"
              fill="#4447A9"
            />
          </svg>

          <h2 className="text-xs pb-3 ">
            <span className=" text-[#4447A9]"> Lab.. </span>
          </h2>
        </div>

        <div className="flex flex-row">
          <p className=" text-sm flex flex-col md:text-base text-justify ">
            A curated collection of experiments and side-quests. This space is
            dedicated to continuous learning, exploring new tech stacks, and
            building for the sheer joy of creation. (You should Visit here
            first).
            <span>
              <Link href="/lab">
                <span className="underline text-[#4447A9] text-sm underline-offset-2">
                  Visit lab
                </span>
              </Link>
            </span>
          </p>
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
