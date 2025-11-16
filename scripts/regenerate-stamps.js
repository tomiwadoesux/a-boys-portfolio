import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN, // Use write token
};

const client = createClient(config);

async function regenerateStamps() {
  try {
    console.log('\n=== REGENERATING STAMPS ===\n');

    const query = `
      *[_type == 'guestbook' && !stampImage] | order(date desc) {
        _id,
        name,
        country,
        stampImage,
        stampGenerating,
        date
      }
    `;

    const entriesWithoutStamps = await client.fetch(query);

    if (entriesWithoutStamps.length === 0) {
      console.log('✓ All guestbook entries already have stamps!');
      return;
    }

    console.log(`Found ${entriesWithoutStamps.length} entries without stamps\n`);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ayotomcs.me';

    for (const entry of entriesWithoutStamps) {
      console.log(`Processing: ${entry.name} (${entry.country})`);

      try {
        // First, mark as generating
        await client
          .patch(entry._id)
          .set({ stampGenerating: true })
          .commit();

        // Trigger stamp generation
        const response = await fetch(`${baseUrl}/api/generate-stamp`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            entryId: entry._id,
            country: entry.country,
          }),
        });

        if (response.ok) {
          console.log(`  ✓ Stamp generation triggered\n`);
        } else {
          const errorText = await response.text();
          console.log(`  ✗ Failed: ${response.status} - ${errorText}\n`);
        }
      } catch (err) {
        console.log(`  ✗ Error: ${err.message}\n`);
      }
    }

    console.log(`\nInitiated stamp generation for ${entriesWithoutStamps.length} entries.`);
    console.log('Stamps should be generated within a few minutes.');
    console.log('Check Vercel logs for generation status.');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

regenerateStamps();
