"use client";

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import gsap from 'gsap';

/**
 * Hook to pause GSAP animations during navigation
 * Helps improve perceived navigation speed
 */
export function useNavigationPause() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pausedTimelinesRef = useRef([]);

  useEffect(() => {
    // Pause all active GSAP timelines
    gsap.globalTimeline.paused(true);
    pausedTimelinesRef.current = gsap.globalTimeline.getChildren();

    // Resume after a short delay (allows new page to mount)
    const resumeTimer = setTimeout(() => {
      gsap.globalTimeline.paused(false);
    }, 100);

    return () => clearTimeout(resumeTimer);
  }, [pathname, searchParams]);
}
