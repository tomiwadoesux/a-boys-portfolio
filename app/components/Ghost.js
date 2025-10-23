"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export default function Ghost() {
  const clippedPathRef = useRef(null);

  useEffect(() => {
    // Animate the clipped layer (children) moving left continuously
    // The path will slide from right to left within the clip frame

    gsap.to(clippedPathRef.current, {
      x: -21, // Move left by the width of one wave cycle
      duration: 2,
      ease: "none", // Linear movement
      repeat: -1, // Infinite loop
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % 21) // Loop seamlessly
      }
    });

    return () => {
      gsap.killTweensOf(clippedPathRef.current);
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <svg
        width="250"
        height="300"
        viewBox="0 0 21 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Group 34">
          <g id="b-1" clipPath="url(#clip0_160_173)">
            <path
              ref={clippedPathRef}
              id="idjf"
              d="M30 19.2002C30 21.6001 29.4746 24 28.5996 24C27.7249 23.9993 27.1999 21.6 26.3252 21.5996C25.4502 21.5996 24.9248 24 24.0498 24C23.1751 23.9996 22.6501 21.6003 21.7754 21.5996C20.9004 21.5996 20.375 24 19.5 24C18.625 24 18.0996 21.5996 17.2246 21.5996C16.3499 21.6003 15.8249 23.9996 14.9502 24C14.0752 24 13.5498 21.5996 12.6748 21.5996C11.8001 21.6 11.2751 23.9993 10.4004 24C9.52541 24 9.00003 21.6001 9 19.2002V18H30V19.2002Z"
              fill="black"
            />
            <path
              id="jsd"
              d="M21 19.2002C21 21.6001 20.4746 24 19.5996 24C18.7249 23.9993 18.1999 21.6 17.3252 21.5996C16.4502 21.5996 15.9248 24 15.0498 24C14.1751 23.9996 13.6501 21.6003 12.7754 21.5996C11.9004 21.5996 11.375 24 10.5 24C9.625 24 9.09961 21.5996 8.22461 21.5996C7.34991 21.6003 6.82495 23.9996 5.9502 24C5.0752 24 4.5498 21.5996 3.6748 21.5996C2.80005 21.6 2.27509 23.9993 1.40039 24C0.525414 24 2.78146e-05 21.6001 0 19.2002V18H21V19.2002Z"
              fill="black"
            />
          </g>
          <path
            id="Subtract"
            d="M9.625 0C16.6251 0 21 5.30427 21 11.6689V19H0V11.6689C0 5.30433 4.37499 9.1119e-05 9.625 0ZM8.78027 7.10254C7.52387 7.10261 6.50586 8.13995 6.50586 9.41992C6.50597 10.6998 7.52393 11.7372 8.78027 11.7373C10.0367 11.7373 11.0556 10.6998 11.0557 9.41992C11.0557 8.13991 10.0367 7.10254 8.78027 7.10254ZM16.3623 7.10254C15.1059 7.10261 14.0879 8.13995 14.0879 9.41992C14.088 10.6998 15.106 11.7372 16.3623 11.7373C17.6187 11.7373 18.6376 10.6998 18.6377 9.41992C18.6377 8.13991 17.6188 7.10254 16.3623 7.10254Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_160_173">
            <rect
              width="21"
              height="7"
              fill="white"
              transform="translate(0 18)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
