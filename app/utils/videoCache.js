/**
 * Video caching utility
 * Provides functions to get cached or live video URLs
 * Falls back to Sanity CDN if cached video not available
 */

/**
 * Get the video URL, preferring cached local version if available
 * @param {string} videoUrl - Original video URL from Sanity
 * @param {string} projectId - Project ID
 * @param {'desktop' | 'mobile'} type - Video type
 * @returns {string} - URL to cached or live video
 */
export function getCachedVideoUrl(videoUrl, projectId, type) {
  if (!videoUrl) return null;

  // In production, use cached video if available
  if (process.env.NODE_ENV === 'production') {
    const cachedPath = `/videos/${projectId}-${type}.mp4`;

    // Try cached version (will fall back if 404)
    return cachedPath;
  }

  // In development, use Sanity URL directly
  return videoUrl;
}

/**
 * Get both cached and fallback URLs
 * Useful for <video> tag with multiple sources
 */
export function getVideoSources(videoUrl, projectId, type) {
  return {
    cached: getCachedVideoUrl(videoUrl, projectId, type),
    fallback: videoUrl // Sanity URL as fallback
  };
}

/**
 * Check if a cached video is likely to be available
 * This is a client-side hint (doesn't guarantee availability)
 */
export function isCachedVideoAvailable(projectId, type) {
  if (process.env.NODE_ENV !== 'production') return false;

  // In production, assume cached videos are available
  // The server will serve them if they exist, fallback to Sanity otherwise
  return true;
}
