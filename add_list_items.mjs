import { createClient } from 'next-sanity';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-10-17',
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});

const items = [
  "Run a 10k or a marathon someday",
  "Finish that extension I started",
  "Build a minimal man-cave or studio",
  "Swim with wild dolphins or sea turtles (this is cool)",
  "Learn carpentry and mix designs with building designs",
  "Spend a week with no screens once a year",
  "Start a small side business that funds my trips",
  "Learn to cook well",
  "Start exploring outside the Bible",
  "Learn to mix signature cocktails"
];

async function addListItems() {
  try {
    const results = [];
    for (const text of items) {
      const doc = await writeClient.create({
        _type: 'list',
        text: text,
        completed: false,
      });
      results.push({ text, id: doc._id });
      console.log(`✓ Added: ${text}`);
    }
    console.log(`\n✅ Successfully added ${results.length} items to your List!`);
  } catch (error) {
    console.error('Error adding items:', error.message);
  }
}

addListItems();
