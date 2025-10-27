const { createClient } = require('@sanity/client');
require('dotenv').config({ path: '.env.local' });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2025-10-17',
  token: process.env.SANITY_READ_TOKEN
});

async function retryStampGeneration() {
  console.log('Fetching entries without stamps...');

  const entries = await client.fetch(`
    *[_type == "guestbook" && !defined(stampImage)] {
      _id,
      name,
      city,
      region,
      country
    }
  `);

  console.log(`Found ${entries.length} entries without stamps`);

  for (const entry of entries) {
    console.log(`\nGenerating stamp for: ${entry.name} from ${entry.region || entry.city}, ${entry.country}`);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-stamp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entryId: entry._id,
          city: entry.city,
          country: entry.country
        }),
      });

      if (response.ok) {
        console.log(`✓ Stamp generation started for ${entry.name}`);
      } else {
        const error = await response.json();
        console.error(`✗ Failed for ${entry.name}:`, error);
      }
    } catch (error) {
      console.error(`✗ Error for ${entry.name}:`, error.message);
    }

    // Wait 2 seconds between requests to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 2000));
  }

  console.log('\n✓ Done! Check back in a minute for generated stamps.');
}

retryStampGeneration().catch(console.error);
