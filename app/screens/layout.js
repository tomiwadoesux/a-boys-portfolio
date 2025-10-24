"use client";

import { useEffect } from "react";

export default function ScreensLayout({ children }) {
  useEffect(() => {
    const updateScrollState = () => {
      const scrollContainer = document.getElementById("main-scroll-container");
      const isMobileView = window.innerWidth < 768;

      if (scrollContainer) {
        // Desktop: disable scroll (wheel controls videos)
        // Mobile: enable scroll (carousel controls videos)
        scrollContainer.style.overflow = isMobileView ? "auto" : "hidden";
      }
    };

    // Set initial state
    updateScrollState();

    // Update on resize
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  useEffect(() => {
    // Hide Socials footer
    const socials = document.querySelector('svg[viewBox*="social"]')?.closest('section') ||
      Array.from(document.querySelectorAll('section')).find(s => s.textContent.includes('twitter') || s.textContent.includes('instagram') || s.textContent.includes('github'));

    if (socials) {
      socials.style.display = 'none';
    }

    // Reduce padding on Body for screens page on mobile only
    const sections = document.querySelectorAll('section');
    let screenBodySection = null;

    // Find the Body section that contains the navigation (has h1 with "Ayotomcs")
    sections.forEach(section => {
      const h1 = section.querySelector('h1');
      if (h1 && h1.textContent.includes('Ayotomcs')) {
        const div = section.querySelector('div[class*="pt-36"]');
        if (div) {
          screenBodySection = div;
          // Apply reduced padding for mobile screens only
          div.classList.remove('pt-36');
          div.classList.add('pt-4', 'md:pt-20');
        }
      }
    });

    // Get the scroll container to restore its overflow
    const scrollContainer = document.getElementById("main-scroll-container");

    // Cleanup - restore scrolling and padding when leaving screens page
    return () => {
      if (socials) {
        socials.style.display = '';
      }
      if (screenBodySection) {
        screenBodySection.classList.remove('pt-4', 'md:pt-20');
        screenBodySection.classList.add('pt-36');
      }
      // Restore scroll behavior on other pages
      if (scrollContainer) {
        scrollContainer.style.overflow = 'auto';
      }
    };
  }, []);

  return children;
}
