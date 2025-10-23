"use client";

import { useEffect, useRef, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import gsap from 'gsap';

/**
 * Inner component that uses useSearchParams
 * Wrapped in Suspense to handle server-side rendering during builds
 */
function NavigationPauseInner() {
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

/**
 * Wrapper component to pause all GSAP animations during navigation (not initial load)
 * This helps improve perceived navigation speed
 */
export default function NavigationPauseWrapper() {
  return (
    <Suspense fallback={null}>
      <NavigationPauseInner />
    </Suspense>
  );
}
