import { createClient } from '@sanity/client';
import fetch from 'node-fetch';

const client = createClient({
  projectId: 'vwhgs4bj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function generateStamps() {
  try {
    console.log('Fetching guestbook entries without a stamp...\n');

    const entries = await client.fetch(
      `*[_type == "guestbook" && approved == true && !defined(stampImage)] {
        _id,
        name,
        city,
        region,
        country,
        date
      }`
    );

    console.log(`Found ${entries.length} entries without a stamp.\n`);

    for (const entry of entries) {
      console.log(`Generating stamp for ${entry.name} from ${entry.city}, ${entry.country}`);

      try {
        const response = await fetch('http://localhost:3000/api/generate-stamp', {
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
          console.log(`  Successfully generated stamp for ${entry.name}`);
        } else {
          const error = await response.json();
          console.error(`  Failed to generate stamp for ${entry.name}:`, error);
        }
      } catch (error) {
        console.error(`  Error generating stamp for ${entry.name}:`, error.message);
      }
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

generateStamps();
