"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

export function Shine({
  delay = 0.5,
  duration = 1.7,
  repeat = -1,
  repeatDelay = 3.2,
  gradient = "linear-gradient(90deg, transparent 30%, rgba(255,255,255,0.6) 50%, transparent 70%)"
}) {
  const shineRef = useRef(null);

  useEffect(() => {
    if (!shineRef.current) return;

    const tl = gsap.timeline({ delay });

    tl.to(shineRef.current, {
      x: "100%",
      duration,
      ease: "power2.inOut",
    })
      .set(shineRef.current, { x: "-100%" })
      .to(shineRef.current, {
        x: "100%",
        duration,
        ease: "power2.inOut",
        repeat,
        repeatDelay,
      });

    return () => {
      tl.kill();
    };
  }, [delay, duration, repeat, repeatDelay]);

  return (
    <div
      ref={shineRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
      style={{
        background: gradient,
        transform: "translateX(-100%)",
        zIndex: 1,
      }}
    />
  );
}
