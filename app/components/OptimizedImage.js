"use client";

import Image from 'next/image';
import { useState, useCallback } from 'react';

/**
 * OptimizedImage Component
 * Wrapper around Next.js Image with enhanced optimization features
 * - Lazy loading with LQIP (Low Quality Image Placeholder)
 * - Blur-up effect
 * - Automatic WebP format support
 * - Responsive sizing with srcSet
 */
export default function OptimizedImage({
  src,
  alt = '',
  width,
  height,
  priority = false,
  className = '',
  objectFit = 'cover',
  objectPosition = 'center',
  quality = 75,
  blur = false,
  onLoad = null,
  sizes = '100vw',
  fill = false,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(priority);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  }, [onLoad]);

  const blurDataURL = blur
    ? 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Cfilter id="b"%3E%3CfeGaussianBlur stdDeviation="20"/%3E%3C/filter"%3E%3Crect fill="%23ddd" width="400" height="300" filter="url(%23b)"/%3E%3C/svg%3E'
    : undefined;

  const imageProps = {
    src,
    alt,
    quality,
    priority,
    onLoadingComplete: handleLoad,
    sizes,
    placeholder: blur ? 'blur' : 'empty',
    blurDataURL,
    className: `${className} transition-opacity duration-300 ${
      isLoaded ? 'opacity-100' : 'opacity-0'
    }`,
    style: {
      objectFit,
      objectPosition,
    },
  };

  if (fill) {
    return <Image fill {...imageProps} {...props} />;
  }

  return (
    <Image
      width={width}
      height={height}
      {...imageProps}
      {...props}
    />
  );
}
