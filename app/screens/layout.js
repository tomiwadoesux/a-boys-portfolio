"use client";

import { useEffect } from "react";

export default function ScreensLayout({ children }) {
  useEffect(() => {
    const isMobileView = window.innerWidth < 768;
    const scrollContainer = document.getElementById("main-scroll-container");
    let socials = null;
    let bodySection = null;

    if (scrollContainer) {
      // Set overflow based on device
      scrollContainer.style.overflow = isMobileView ? "auto" : "hidden";
    }

    // Use requestAnimationFrame to defer non-critical DOM queries
    requestAnimationFrame(() => {
      // Hide Socials footer - simplified query
      socials = document.querySelector('[class*="flex"][class*="pb-"]');
      if (socials) {
        socials.style.display = 'none';
      }

      // Reduce padding on Body - more specific query
      bodySection = document.querySelector('div[class*="pt-36"]');
      if (bodySection) {
        bodySection.classList.remove('pt-36');
        bodySection.classList.add('pt-4', 'md:pt-20');
      }
    });

    // Cleanup - restore everything
    return () => {
      if (socials) socials.style.display = '';
      if (bodySection) {
        bodySection.classList.remove('pt-4', 'md:pt-20');
        bodySection.classList.add('pt-36');
      }
      if (scrollContainer) scrollContainer.style.overflow = 'auto';
    };
  }, []);

  return children;
}
