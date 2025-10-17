"use client";

import { useEffect, useRef, useState } from "react";
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
  const [currentText, setCurrentText] = useState(originalText);

  useEffect(() => {
    if (!textRef.current) return;

    const startText = isScrambled ? originalText : targetText;
    const endText = isScrambled ? targetText : originalText;

    // Create a timeline for write out then write in
    const tl = gsap.timeline();

    // Write out (delete characters)
    tl.to(textRef.current, {
      duration: startText.length * 0.03,
      text: {
        value: "",
      },
      ease: "none",
      onUpdate: function() {
        setCurrentText(this.targets()[0].textContent);
      }
    });

    // Write in (type characters)
    tl.to(textRef.current, {
      duration: endText.length * 0.03,
      text: {
        value: endText,
      },
      ease: "none",
      onUpdate: function() {
        setCurrentText(this.targets()[0].textContent);
      }
    });

  }, [isScrambled, originalText, targetText]);

  return (
    <h4 ref={textRef} className={className}>
      {currentText}
    </h4>
  );
}