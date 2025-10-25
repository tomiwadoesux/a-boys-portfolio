"use client";

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * SmoothScroll Component
 * Implements smooth scrolling across the entire site using GSAP ScrollSmoother
 * Creates a buttery smooth scrolling experience with minimal jank
 *
 * Works with the existing #main-scroll-container structure
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Register plugins
      if (!gsap.plugins.ScrollTrigger) {
        gsap.registerPlugin(ScrollTrigger);
      }
      if (!gsap.plugins.ScrollSmoother) {
        gsap.registerPlugin(ScrollSmoother);
      }

      // Wait for DOM to be fully loaded
      const initSmoothScroll = () => {
        const wrapper = document.getElementById('smooth-wrapper');
        const content = document.getElementById('smooth-content');

        if (!wrapper || !content) {
          console.warn('SmoothScroll: Could not find required elements');
          return;
        }

        // Create smooth scroller with proper configuration
        let smoother = null;

        try {
          smoother = ScrollSmoother.create({
            wrapper: '#smooth-wrapper',
            content: '#smooth-content',
            smooth: 1.2, // Smoothing amount (0.8-1.5 is typical for modern browsers)
            effects: true, // Enable parallax effects
            normalizeScroll: true, // Better cross-browser scroll
            ignoreMobileResize: true, // Prevent jank on mobile resize
          });

          // Optimize GSAP ticker
          gsap.ticker.lagSmoothing(0);

          console.log('✓ SmoothScroll initialized successfully');
        } catch (error) {
          console.warn('SmoothScroll: Failed to create ScrollSmoother:', error);
          // Fallback: Continue without smooth scroll but don't break the site
          return;
        }

        // Cleanup function
        return () => {
          if (smoother) {
            try {
              smoother.kill();
            } catch (e) {
              // Ignore cleanup errors
            }
          }
        };
      };

      // Initialize after a short delay to ensure DOM is ready
      let cleanup;
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          cleanup = initSmoothScroll();
        }, { once: true });
      } else {
        // DOM already loaded
        cleanup = initSmoothScroll();
      }

      return () => {
        if (typeof cleanup === 'function') {
          cleanup();
        }
      };
    } catch (error) {
      console.warn('SmoothScroll initialization error:', error);
      // Silently fail without breaking the site
    }
  }, []);

  return null; // This component doesn't render anything
}
