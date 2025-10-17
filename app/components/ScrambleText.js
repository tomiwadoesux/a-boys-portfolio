"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default function ScrambleText({
  originalText,
  targetText,
  isScrambled,
  className = "",
}) {
  const textRef = useRef(null);

  useEffect(() => {
    if (!textRef.current) return;

    const text = isScrambled ? targetText : originalText;

    gsap.to(textRef.current, {
      duration: text.length * 0.1,
      text: {
        value: text,
      },
      ease: "none",
    });
  }, [isScrambled, originalText, targetText]);

  return (
    <h4 ref={textRef} className={className}>
      {isScrambled ? targetText : originalText}
    </h4>
  );
}