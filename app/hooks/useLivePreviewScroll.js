"use client";

import { useEffect } from "react";

/**
 * Hook to manage scroll behavior when live preview is active
 * Prevents unintended scroll jumps on mobile when toggling iframe
 */
export function useLivePreviewScroll(showLivePreview) {
  // Previously this hook locked scroll position to prevent jumps,
  // but it was preventing users from scrolling normally.
  useEffect(() => {
    // Intentional no-op to allow natural scrolling
  }, [showLivePreview]);
}
