// Run this script to get the Spotify authorization URL
// Usage: node get-spotify-auth-url.js

require('dotenv').config({ path: '.env.local' });

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const REDIRECT_URI = 'http://127.0.0.1:8000/callback'; // Using loopback address (port can be dynamic)

// Scopes needed for the music widget
const SCOPES = [
  'user-read-currently-playing',
  'user-read-recently-played',
].join(' ');

if (!CLIENT_ID) {
  console.error('❌ Error: SPOTIFY_CLIENT_ID not found in .env.local');
  process.exit(1);
}

const params = new URLSearchParams({
  client_id: CLIENT_ID,
  response_type: 'code',
  redirect_uri: REDIRECT_URI,
  scope: SCOPES,
});

const authUrl = `https://accounts.spotify.com/authorize?${params.toString()}`;

console.log('\n🎵 Spotify Authorization URL\n');
console.log('━'.repeat(80));
console.log('\n1. Open this URL in your browser:\n');
console.log(`   ${authUrl}\n`);
console.log('2. Authorize the application');
console.log('3. You will be redirected to your callback page with the authorization code');
console.log('4. Copy the authorization code from the callback page');
console.log('5. Run: node exchange-spotify-code.js YOUR_AUTH_CODE\n');
console.log('━'.repeat(80));
console.log('\nRedirect URI configured:', REDIRECT_URI);
console.log('\n⚠️  Make sure this redirect URI is added in your Spotify Dashboard:');
console.log('   https://developer.spotify.com/dashboard\n');
