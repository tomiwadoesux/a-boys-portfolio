import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Smart Route Prefetching Hook
 * Prefetches routes on hover/focus to make navigation snappy
 * Uses requestIdleCallback for non-blocking prefetching
 */
export function usePrefetch() {
  const router = useRouter();

  const prefetchRoute = useCallback((href) => {
    // Use requestIdleCallback to prefetch when browser is idle
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        router.prefetch(href);
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        router.prefetch(href);
      }, 500);
    }
  }, [router]);

  return prefetchRoute;
}

/**
 * Prefetch multiple routes at once
 */
export function prefetchRoutes(routes) {
  if (typeof window === 'undefined') return;

  routes.forEach((route) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        fetch(`/_next/data/${process.env.BUILD_ID}${route}.json`, {
          priority: 'low',
        }).catch(() => {
          // Silently fail if prefetch doesn't work
        });
      });
    }
  });
}

/**
 * Prefetch on link hover
 */
export function createPrefetchLink(href, router) {
  return () => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        router.prefetch(href);
      });
    } else {
      router.prefetch(href);
    }
  };
}
