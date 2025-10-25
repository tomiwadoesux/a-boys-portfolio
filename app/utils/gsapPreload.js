/**
 * GSAP Preload Utility
 * Preloads GSAP and plugins to prevent animation delays
 * Optimized for Next.js 16 with Turbopack
 */

import { gsap } from 'gsap';

let isGsapPreloaded = false;
let isScrollTriggerLoaded = false;

/**
 * Preload GSAP by running a simple animation
 * This initializes GSAP's internal systems before they're needed
 */
export function preloadGsap() {
  if (typeof window === 'undefined' || isGsapPreloaded) return;

  try {
    // Create a dummy element and run a simple animation
    // This forces GSAP to initialize its internal systems
    const dummy = document.createElement('div');
    dummy.style.position = 'absolute';
    dummy.style.opacity = '0';
    dummy.style.pointerEvents = 'none';
    document.body.appendChild(dummy);

    // Run a quick animation to warm up GSAP
    gsap.to(dummy, {
      duration: 0.001,
      opacity: 1,
      onComplete: () => {
        try {
          document.body.removeChild(dummy);
        } catch (e) {
          // Element might already be removed
        }
      }
    });

    isGsapPreloaded = true;
  } catch (error) {
    console.warn('GSAP preload failed:', error);
  }
}

/**
 * Preload ScrollTrigger plugin
 */
export async function preloadScrollTrigger() {
  if (typeof window === 'undefined' || isScrollTriggerLoaded) return;

  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    if (!gsap.plugins.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
    }
    isScrollTriggerLoaded = true;
  } catch (error) {
    console.warn('ScrollTrigger preload failed:', error);
  }
}

/**
 * Preload fonts for better performance
 */
export function preloadFonts() {
  if (typeof window === 'undefined') return;

  try {
    // Preload font files using requestIdleCallback
    const fontFamilies = ['Geist', 'Poppins'];

    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        fontFamilies.forEach((family) => {
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'font';
          link.type = 'font/woff2';
          document.head.appendChild(link);
        });
      });
    }
  } catch (error) {
    console.warn('Font preload failed:', error);
  }
}

/**
 * Initialize all GSAP resources
 * Call this on app mount for optimal performance
 */
export function initializeGsap() {
  if (typeof window === 'undefined') return;

  // Preload GSAP core
  preloadGsap();

  // Preload ScrollTrigger asynchronously
  preloadScrollTrigger();

  // Preload fonts
  preloadFonts();

  // Set global GSAP defaults for better performance
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.6,
  });

  // Force ticker to start and set optimal lag smoothing
  gsap.ticker.lagSmoothing(0);

  // Set autoKill to false for better control
  gsap.config({ autoKill: false });

  console.log('✓ GSAP initialized with optimizations');
}
