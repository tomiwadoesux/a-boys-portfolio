"use client";

import { useEffect, useRef, useState, memo } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const ScrambleText = memo(function ScrambleText({
  originalText,
  targetText,
  isScrambled,
  className = "",
  hasInteracted = false,
}) {
  const textRef = useRef(null);
  const [currentText, setCurrentText] = useState(originalText);
  const timelineRef = useRef(null);

  useEffect(() => {
    if (!textRef.current || !hasInteracted) return;

    // Kill previous animation if it exists
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const startText = isScrambled ? originalText : targetText;
    const endText = isScrambled ? targetText : originalText;

    // Create a timeline for write out then write in
    const tl = gsap.timeline();
    timelineRef.current = tl;

    // Write out (delete characters)
    tl.to(textRef.current, {
      duration: startText.length * 0.03,
      text: {
        value: "",
      },
      ease: "none",
    });

    // Write in (type characters)
    tl.to(textRef.current, {
      duration: endText.length * 0.03,
      text: {
        value: endText,
      },
      ease: "none",
      onComplete: () => {
        setCurrentText(endText);
      },
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [isScrambled, originalText, targetText, hasInteracted]);

  return (
    <h4 ref={textRef} className={className}>
      {currentText}
    </h4>
  );
});

export default ScrambleText;
