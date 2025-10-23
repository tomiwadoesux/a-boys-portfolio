/**
 * Script to prerender and cache videos during build time
 * Downloads videos from Sanity and saves them locally
 * Run this during the build process to ensure videos are available
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');
const videosDir = path.join(projectRoot, 'public', 'videos');

// Ensure videos directory exists
if (!fs.existsSync(videosDir)) {
  fs.mkdirSync(videosDir, { recursive: true });
  console.log(`✓ Created videos directory: ${videosDir}`);
}

/**
 * Download a video from URL and save it locally
 */
async function downloadVideo(videoUrl, filename) {
  try {
    const videoPath = path.join(videosDir, filename);

    // Skip if already exists
    if (fs.existsSync(videoPath)) {
      console.log(`✓ Video already cached: ${filename}`);
      return { success: true, path: `/videos/${filename}` };
    }

    console.log(`⏳ Downloading video: ${filename}...`);

    const response = await fetch(videoUrl, {
      timeout: 120000, // 2 minute timeout for large videos
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; VideoPrerenderer/1.0)'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    // Write video to file
    const fileStream = fs.createWriteStream(videoPath);

    return new Promise((resolve, reject) => {
      response.body.pipe(fileStream);

      fileStream.on('finish', () => {
        const stats = fs.statSync(videoPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        console.log(`✓ Cached video: ${filename} (${sizeMB}MB)`);
        resolve({ success: true, path: `/videos/${filename}`, size: stats.size });
      });

      fileStream.on('error', (err) => {
        fs.unlink(videoPath, () => {}); // Clean up on error
        reject(err);
      });
    });
  } catch (error) {
    console.error(`✗ Failed to cache video ${filename}:`, error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Main prerender function
 */
export async function prerendVideos(projects) {
  if (!projects || projects.length === 0) {
    console.log('ℹ No projects with videos to prerender');
    return [];
  }

  console.log(`\n📹 Prerendering ${projects.length} project videos...\n`);

  const results = [];

  for (const project of projects) {
    if (project.desktopVideo) {
      const filename = `${project._id}-desktop.mp4`;
      const result = await downloadVideo(project.desktopVideo, filename);
      results.push({ ...result, type: 'desktop', projectId: project._id });
    }

    if (project.mobileVideo) {
      const filename = `${project._id}-mobile.mp4`;
      const result = await downloadVideo(project.mobileVideo, filename);
      results.push({ ...result, type: 'mobile', projectId: project._id });
    }
  }

  const successful = results.filter(r => r.success).length;
  console.log(`\n✓ Prerendering complete: ${successful}/${results.length} videos cached\n`);

  return results;
}

// Export for use in build scripts
export default prerendVideos;
