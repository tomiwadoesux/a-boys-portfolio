import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
};

const client = createClient(config);

async function checkStamps() {
  try {
    const query = `
      *[_type == 'guestbook'] | order(date desc) {
        _id,
        name,
        country,
        stampImage,
        stampGenerating,
        stampError,
        stampErrorMessage,
        date
      }
    `;

    const entries = await client.fetch(query);

    console.log('\n=== GUESTBOOK STAMP STATUS ===\n');
    console.log(`Total entries: ${entries.length}`);
    console.log(`With stamps: ${entries.filter(e => e.stampImage).length}`);
    console.log(`Without stamps: ${entries.filter(e => !e.stampImage).length}`);

    const needsStamp = entries.filter(e => !e.stampImage);
    if (needsStamp.length > 0) {
      console.log(`\nEntries missing stamps (${needsStamp.length}):`);
      needsStamp.forEach(e => {
        console.log(`  • ${e.name.padEnd(20)} | ${e.country.padEnd(20)} | Generating: ${e.stampGenerating} | Error: ${e.stampError}`);
        if (e.stampErrorMessage) {
          console.log(`    └─ Error: ${e.stampErrorMessage}`);
        }
      });
    }

  } catch (err) {
    console.error('Error fetching entries:', err.message);
    process.exit(1);
  }
}

checkStamps();
