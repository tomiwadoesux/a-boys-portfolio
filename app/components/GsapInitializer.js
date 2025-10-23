"use client";

import { useEffect } from 'react';
import { initializeGsap } from '../utils/gsapPreload';

/**
 * Initializes GSAP on app mount
 * This component should be included in the root layout
 */
export default function GsapInitializer() {
  useEffect(() => {
    // Initialize GSAP as soon as the app mounts
    initializeGsap();
  }, []);

  return null; // This component doesn't render anything
}
