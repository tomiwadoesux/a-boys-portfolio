import { createClient } from 'next-sanity';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config({ path: '.env.local' });

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
};

const client = createClient(config);

async function forceRegenerateStamps() {
  try {
    console.log('\n=== FORCE REGENERATING STAMPS ===\n');

    // Get entries that are stuck generating or have no stamps
    const query = `
      *[_type == 'guestbook' && (stampGenerating == true || !stampImage)] | order(date desc) {
        _id,
        name,
        country,
        stampImage,
        stampGenerating,
        stampError,
        date
      }
    `;

    const entriesToFix = await client.fetch(query);

    if (entriesToFix.length === 0) {
      console.log('✓ All guestbook entries are done!');
      return;
    }

    console.log(`Found ${entriesToFix.length} entries to regenerate\n`);

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://ayotomcs.me';

    for (const entry of entriesToFix) {
      console.log(`Processing: ${entry.name} (${entry.country})`);

      try {
        // Reset the generating flag first
        await client
          .patch(entry._id)
          .set({
            stampGenerating: false,
            stampError: false,
            stampErrorMessage: null
          })
          .commit();

        console.log(`  → Reset flags for entry`);

        // Small delay before triggering new generation
        await new Promise(resolve => setTimeout(resolve, 500));

        // Mark as generating again
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
          console.log(`  ✓ Triggered stamp generation\n`);
        } else {
          const errorText = await response.text();
          console.log(`  ✗ Failed: ${response.status}\n`);
        }
      } catch (err) {
        console.log(`  ✗ Error: ${err.message}\n`);
      }
    }

    console.log(`\nInitiated stamp generation for ${entriesToFix.length} entries.`);
    console.log('Stamps should be generated within 1-2 minutes.');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

forceRegenerateStamps();
