/**
 * Build-time prerendering script
 * Fetches project data from Sanity and prerenders videos
 * Run this as part of the build process: `node scripts/build-prerender.js`
 */

import { client } from '../sanity/lib/client.js';
import { projectsQuery } from '../sanity/lib/queries.js';
import prerendVideos from './prerender-videos.js';

async function main() {
  try {
    console.log('🔨 Starting build-time prerendering...\n');

    // Fetch all projects with videos
    console.log('📡 Fetching projects from Sanity...');
    const projects = await client.fetch(projectsQuery);
    const projectsWithVideos = projects.filter(p => p.desktopVideo || p.mobileVideo);

    console.log(`✓ Found ${projectsWithVideos.length} projects with videos\n`);

    // Prerender videos
    const results = await prerendVideos(projectsWithVideos);

    // Summary
    const totalSize = results
      .filter(r => r.success && r.size)
      .reduce((sum, r) => sum + r.size, 0);

    console.log(`📊 Summary:`);
    console.log(`   Total videos cached: ${results.filter(r => r.success).length}`);
    console.log(`   Total size: ${(totalSize / (1024 * 1024)).toFixed(2)}MB`);
    console.log(`\n✓ Prerendering complete!\n`);

  } catch (error) {
    console.error('✗ Prerendering failed:', error);
    process.exit(1);
  }
}

main();
