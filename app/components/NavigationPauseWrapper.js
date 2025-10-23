"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import gsap from 'gsap';

/**
 * Wrapper component to pause all GSAP animations during navigation (not initial load)
 * This helps improve perceived navigation speed
 */
export default function NavigationPauseWrapper() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialLoadRef = useRef(true);

  useEffect(() => {
    // Skip pausing on initial load
    if (isInitialLoadRef.current) {
      isInitialLoadRef.current = false;
      return;
    }

    // Pause all GSAP timelines during navigation
    gsap.globalTimeline.paused(true);

    // Resume animations after a short delay (allows page to render)
    const resumeTimer = setTimeout(() => {
      gsap.globalTimeline.paused(false);
    }, 50);

    return () => clearTimeout(resumeTimer);
  }, [pathname, searchParams]);

  return null; // This component doesn't render anything
}
