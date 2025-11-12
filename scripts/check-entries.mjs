import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'vwhgs4bj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_READ_TOKEN,
  useCdn: false,
});

async function checkEntries() {
  try {
    const entries = await client.fetch(`*[_type == "guestbook"] | order(_createdAt desc)[0...5]`);
    console.log('Latest entries:', JSON.stringify(entries, null, 2));
  } catch (error) {
    console.error('Error:', error);
  }
}

checkEntries();