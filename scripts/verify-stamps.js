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

async function verifyStamps() {
  try {
    console.log('\n=== GUESTBOOK STAMP VERIFICATION ===\n');

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

    console.log(`Total entries: ${entries.length}`);
    console.log(`With stamps: ${entries.filter(e => e.stampImage).length}`);
    console.log(`Without stamps: ${entries.filter(e => !e.stampImage).length}`);
    console.log(`Currently generating: ${entries.filter(e => e.stampGenerating).length}`);
    console.log(`With errors: ${entries.filter(e => e.stampError).length}`);

    if (entries.filter(e => e.stampError).length > 0) {
      console.log('\n⚠ Entries with stamp generation errors:');
      entries.filter(e => e.stampError).forEach(e => {
        console.log(`  • ${e.name} (${e.country})`);
        if (e.stampErrorMessage) {
          console.log(`    └─ ${e.stampErrorMessage}`);
        }
      });
    }

    if (entries.filter(e => e.stampGenerating).length > 0) {
      console.log('\n⏳ Entries currently generating stamps:');
      entries.filter(e => e.stampGenerating).forEach(e => {
        console.log(`  • ${e.name} (${e.country})`);
      });
    }

    console.log('\n✓ Stamp status check complete');

  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

verifyStamps();
