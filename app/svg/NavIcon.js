"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NavIcon({ isOpen }) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);

  useEffect(() => {
    if (!line1Ref.current || !line2Ref.current || !line3Ref.current) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.Out" }
    });

    if (isOpen) {
      // Morph to X
      tl.to(line1Ref.current, {
        attr: { x1: 13.6066, y1: 1.06066, x2: 4.06063, y2: 10.6066 }
      }, 0)
        .to(line2Ref.current, {
          opacity: 0
        }, 0)
        .to(line3Ref.current, {
          attr: { x1: 13.5459, y1: 10.6064, x2: 3.99997, y2: 1.0605 }
        }, 0);
    } else {
      // Morph back to hamburger
      tl.to(line1Ref.current, {
        attr: { x1: 15.75, y1: 10.75, x2: 2.25, y2: 10.75 }
      }, 0)
        .to(line2Ref.current, {
          opacity: 1
        }, 0)
        .to(line3Ref.current, {
          attr: { x1: 15.75, y1: 0.75, x2: 2.25, y2: 0.75 }
        }, 0);
    }

    return () => tl.kill();
  }, [isOpen]);

  return (
    <div>
      <svg
        width="17"
        height="12"
        viewBox="0 0 17 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="Frame 169">
          <line
            ref={line1Ref}
            id="line1"
            x1="15.75"
            y1="10.75"
            x2="2.25"
            y2="10.75"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            ref={line2Ref}
            id="line2"
            x1="15.75"
            y1="5.75"
            x2="2.25"
            y2="5.75"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            ref={line3Ref}
            id="line3"
            x1="15.75"
            y1="0.75"
            x2="2.25"
            y2="0.75"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
