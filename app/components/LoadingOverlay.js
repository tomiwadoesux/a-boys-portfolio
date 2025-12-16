"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import Ayotomcs from "./Ayotomcs";

export default function LoadingOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const overlayRef = useRef(null);
  const contentRef = useRef(null);

  // Check if mobile on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }
  }, []);

  useEffect(() => {
    // Skip on mobile
    if (isMobile) return;

    // Show overlay on route change
    setIsVisible(true);

    // Hide overlay after navigation completes (brief delay to allow DOM to update)
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 600);

    return () => clearTimeout(hideTimer);
  }, [pathname, isMobile]);

  useEffect(() => {
    // Skip on mobile
    if (isMobile) return;

    const handleStartLoading = () => {
      setIsVisible(true);
    };

    window.addEventListener("start-loading", handleStartLoading);
    return () =>
      window.removeEventListener("start-loading", handleStartLoading);
  }, [isMobile]);

  useEffect(() => {
    // Skip on mobile
    if (isMobile) return;

    if (!overlayRef.current || !contentRef.current) return;

    try {
      if (isVisible) {
        gsap.to(overlayRef.current, {
          opacity: 1,
          duration: 0.3,
          pointerEvents: "auto",
        });
        gsap.to(contentRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          pointerEvents: "none",
        });
        gsap.to(contentRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    } catch (error) {
      console.warn("LoadingOverlay animation failed:", error);
    }
  }, [isVisible, isMobile]);

  // Don't render on mobile
  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(8px)",
        opacity: 0,
        pointerEvents: "none",
      }}
    >
      <div
        ref={contentRef}
        className="flex items-center justify-center"
        style={{
          opacity: 0,
          scale: 0.8,
        }}
      >
        <div className="flex scale-150">
          <Ayotomcs />
        </div>
      </div>
    </div>
  );
}
