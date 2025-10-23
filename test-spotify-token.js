// Test if the refresh token works
require('dotenv').config({ path: '.env.local' });

const https = require('https');

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

console.log('\n🔍 Testing Spotify Credentials\n');
console.log('━'.repeat(80));
console.log('Client ID:', clientId ? '✓ Set' : '✗ Not set');
console.log('Client Secret:', clientSecret ? '✓ Set' : '✗ Not set');
console.log('Refresh Token:', refreshToken ? '✓ Set' : '✗ Not set');
console.log('Refresh Token Length:', refreshToken?.length || 0);
console.log('━'.repeat(80));

if (!clientId || !clientSecret || !refreshToken) {
  console.error('\n❌ Missing credentials!\n');
  process.exit(1);
}

console.log('\n⏳ Attempting to get access token from Spotify...\n');

const postData = new URLSearchParams({
  grant_type: 'refresh_token',
  refresh_token: refreshToken,
}).toString();

const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

const options = {
  hostname: 'accounts.spotify.com',
  path: '/api/token',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${auth}`,
    'Content-Length': postData.length,
  },
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const response = JSON.parse(data);

      if (response.error) {
        console.error('❌ Spotify API Error:');
        console.error('━'.repeat(80));
        console.error('Error:', response.error);
        console.error('Description:', response.error_description);
        console.error('━'.repeat(80));
        console.error('\nPossible issues:');
        console.error('  - Refresh token may be invalid or expired');
        console.error('  - Client credentials may be incorrect');
        console.error('  - Refresh token may not match the client ID\n');
        process.exit(1);
      }

      console.log('✅ Success! Access token obtained:\n');
      console.log('━'.repeat(80));
      console.log('Access Token (first 20 chars):', response.access_token.substring(0, 20) + '...');
      console.log('Token Type:', response.token_type);
      console.log('Expires In:', response.expires_in, 'seconds');
      console.log('Scope:', response.scope);
      console.log('━'.repeat(80));
      console.log('\n✨ Your Spotify integration is working correctly!\n');
      process.exit(0);
    } catch (error) {
      console.error('❌ Error parsing response:', error.message);
      console.error('Response:', data);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request failed:', error.message);
  process.exit(1);
});

req.write(postData);
req.end();
