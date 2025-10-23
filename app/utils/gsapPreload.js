/**
 * GSAP Preload Utility
 * Preloads GSAP and plugins to prevent animation delays
 */

import { gsap } from 'gsap';

let isGsapPreloaded = false;

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
        document.body.removeChild(dummy);
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
  if (typeof window === 'undefined') return;

  try {
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
  } catch (error) {
    console.warn('ScrollTrigger preload failed:', error);
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

  // Set global GSAP defaults for better performance
  gsap.defaults({
    ease: 'power2.out',
    duration: 0.6,
  });

  // Force ticker to start
  gsap.ticker.lagSmoothing(0);
}
