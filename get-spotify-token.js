#!/usr/bin/env node

/**
 * Spotify Refresh Token Generator
 *
 * This script helps you generate a Spotify refresh token for the Music Widget.
 *
 * Steps:
 * 1. Reads SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET from .env.local
 * 2. Run: node get-spotify-token.js
 * 3. Open the URL in your browser
 * 4. Authorize the app
 * 5. Copy the code from the URL after redirect
 * 6. Paste it when prompted
 */

const readline = require('readline');
const https = require('https');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function loadEnv() {
  const envPath = path.join(__dirname, '.env.local');

  if (!fs.existsSync(envPath)) {
    console.error('❌ .env.local file not found!');
    process.exit(1);
  }

  const envContent = fs.readFileSync(envPath, 'utf-8');
  const env = {};

  envContent.split('\n').forEach(line => {
    const match = line.match(/^([^=:#]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      env[key] = value;
    }
  });

  return env;
}

async function getRefreshToken() {
  console.log('\n🎵 Spotify Refresh Token Generator\n');

  // Load from .env.local
  const env = loadEnv();
  const clientId = env.SPOTIFY_CLIENT_ID;
  const clientSecret = env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    console.error('❌ Missing SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET in .env.local');
    process.exit(1);
  }

  console.log('✅ Loaded credentials from .env.local');
  console.log(`   Client ID: ${clientId.substring(0, 10)}...`);
  console.log(`   Client Secret: ${clientSecret.substring(0, 10)}...\n`);

  // Use Spotify's redirect URI capture page (no server needed!)
  const redirectUri = 'https://ayotomcs.me/callback'; // Or use your deployed site
  const scope = 'user-read-currently-playing user-read-recently-played';

  // Step 1: Generate authorization URL
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;

  console.log('\n📝 Step 1: Open this URL in your browser:\n');
  console.log(authUrl);
  console.log('\n📝 Step 2: After authorizing, you\'ll be redirected to a URL like:');
  console.log('http://localhost:3000/callback?code=AQD...');
  console.log('\n📝 Step 3: Copy the "code" parameter from the URL\n');

  // Get authorization code
  const code = await new Promise((resolve) => {
    rl.question('Paste the authorization code here: ', (answer) => {
      resolve(answer.trim());
    });
  });

  // Step 2: Exchange code for tokens
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

          console.log('✅ Success! Here are your tokens:\n');
          console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
          console.log('Add these to your .env file:\n');
          console.log(`SPOTIFY_CLIENT_ID=${clientId}`);
          console.log(`SPOTIFY_CLIENT_SECRET=${clientSecret}`);
          console.log(`SPOTIFY_REFRESH_TOKEN=${response.refresh_token}`);
          console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
          console.log('⚠️  Keep these tokens secret! Don\'t commit them to Git.\n');

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

// Run the script
getRefreshToken()
  .then(() => {
    rl.close();
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Failed to get refresh token:', error.message);
    rl.close();
    process.exit(1);
  });
