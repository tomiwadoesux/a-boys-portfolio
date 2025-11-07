"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import LocomotiveScroll from 'locomotive-scroll';

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollEl = document.querySelector('#main-scroll-container');

    if (!scrollEl) {
      console.warn('SmoothScroll: #main-scroll-container not found');
      return;
    }

    const scroll = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      class: 'is-loaded',
    });

    // Refresh scroll on route changes
    const handleRouteChange = () => {
      if (scroll) {
        scroll.update();
      }
    };

    handleRouteChange(); // Initial update

    // Listen for Next.js route changes
    const observer = new MutationObserver(handleRouteChange);
    observer.observe(document.body, { childList: true, subtree: true });


    return () => {
      if (scroll) {
        scroll.destroy();
      }
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}