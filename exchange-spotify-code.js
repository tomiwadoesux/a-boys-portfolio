#!/usr/bin/env node

/**
 * Exchange Spotify authorization code for refresh token
 * Usage: node exchange-spotify-code.js YOUR_CODE_HERE
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};

  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      env[match[1].trim()] = match[2].trim();
    }
  });

  return env;
}

async function exchangeCode(code) {
  const env = loadEnv();
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;
  const redirectUri = 'http://127.0.0.1:8000/callback'; // Using loopback address (port can be dynamic)

  console.log('\n⏳ Exchanging code for tokens...\n');

  const postData = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code,
    redirect_uri: redirectUri,
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

  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const response = JSON.parse(data);

          if (response.error) {
            console.error('❌ Error:', response.error_description || response.error);
            reject(new Error(response.error_description || response.error));
            return;
          }

          console.log('✅ Success! Here is your refresh token:\n');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
          console.log('Add this to your .env.local file:\n');
          console.log(`SPOTIFY_REFRESH_TOKEN=${response.refresh_token}`);
          console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

          resolve(response.refresh_token);
        } catch (error) {
          console.error('❌ Error parsing response:', error.message);
          console.error('Response:', data);
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      console.error('❌ Request failed:', error.message);
      reject(error);
    });

    req.write(postData);
    req.end();
  });
}

// Get code from command line argument
const code = process.argv[2];

if (!code) {
  console.error('\n❌ Please provide the authorization code!');
  console.log('\nUsage: node exchange-spotify-code.js YOUR_CODE_HERE\n');
  console.log('First, open this URL in your browser:\n');

  const env = loadEnv();
  const clientId = env.SPOTIFY_CLIENT_ID;
  const redirectUri = 'http://127.0.0.1:8000/callback'; // Using loopback address (port can be dynamic)
  const scope = 'user-read-currently-playing user-read-recently-played';
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

  console.log(authUrl);
  console.log('\nThen copy the code from the URL and run:');
  console.log('node exchange-spotify-code.js YOUR_CODE_HERE\n');
  process.exit(1);
}

exchangeCode(code)
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
