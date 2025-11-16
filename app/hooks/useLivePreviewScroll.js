"use client";

import { useEffect } from "react";

/**
 * Hook to manage scroll behavior when live preview is active
 * Prevents unintended scroll jumps on mobile when toggling iframe
 */
export function useLivePreviewScroll(showLivePreview) {
  useEffect(() => {
    const mainScrollContainer = document.getElementById("main-scroll-container");

    if (!mainScrollContainer) return;

    if (showLivePreview) {
      // Store current scroll position when enabling live preview
      const currentScroll = mainScrollContainer.scrollTop;

      // Prevent scrolling while iframe is active on mobile
      const handleScroll = (e) => {
        // Allow natural scrolling, just prevent the jump
        if (Math.abs(mainScrollContainer.scrollTop - currentScroll) > 100) {
          // Scroll jump detected, restore position
          mainScrollContainer.scrollTop = currentScroll;
        }
      };

      mainScrollContainer.addEventListener("scroll", handleScroll, { passive: true });

      return () => {
        mainScrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [showLivePreview]);
}
