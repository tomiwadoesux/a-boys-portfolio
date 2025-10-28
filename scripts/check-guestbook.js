const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'vwhgs4bj',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
});

async function checkGuestbook() {
  try {
    console.log('Fetching guestbook entries...\n');

    const entries = await client.fetch(
      `*[_type == "guestbook" && approved == true] | order(date desc) [0...3] {
        _id,
        name,
        city,
        region,
        country,
        date
      }`
    );

    console.log(`Found ${entries.length} entries:\n`);

    entries.forEach((entry, i) => {
      console.log(`Entry ${i + 1}:`);
      console.log(`  Name: ${entry.name}`);
      console.log(`  City: ${entry.city || 'NOT SET'}`);
      console.log(`  Region: ${entry.region || 'NOT SET'}`);
      console.log(`  Country: ${entry.country || 'NOT SET'}`);
      console.log(`  Date: ${entry.date}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error:', error);
  }
}

checkGuestbook();
