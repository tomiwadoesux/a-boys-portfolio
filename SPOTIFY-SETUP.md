# Spotify Integration Setup Guide

This guide will help you get your Spotify refresh token for the music widget.

## Prerequisites

1. Spotify Developer Account
2. Your Client ID and Client Secret (already in `.env.local`)
3. Redirect URI configured in Spotify Dashboard

## Steps to Get Your Refresh Token

### Step 1: Configure Redirect URI in Spotify Dashboard

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Click on your app
3. Click "Edit Settings"
4. Under "Redirect URIs", add:
   ```
   http://127.0.0.1/callback
   ```
   **Note:** You only need to add `http://127.0.0.1/callback` (without the port). Spotify's new validation rules allow loopback addresses to use dynamic ports!
5. Click "Add" then "Save"

### Step 2: Get Authorization URL

Run this script to get your authorization URL:

```bash
node get-spotify-auth-url.js
```

Or manually build it by running the exchange script without arguments:

```bash
node exchange-spotify-code.js
```

### Step 3: Authorize the Application

1. Copy the authorization URL from the terminal
2. Open it in your browser
3. Log in to Spotify and click "Agree"
4. You'll be redirected to `http://127.0.0.1:8000/callback?code=...`

### Step 4: Get the Authorization Code

The callback page will display your authorization code. Copy it.

Alternatively, you can copy it from the URL bar:
```
http://127.0.0.1:8000/callback?code=YOUR_AUTH_CODE_HERE
```

### Step 5: Exchange Code for Refresh Token

Run this command with your authorization code:

```bash
node exchange-spotify-code.js YOUR_AUTH_CODE_HERE
```

**⚠️ Important:** Authorization codes expire after 10 minutes! If it expires, go back to Step 2.

### Step 6: Update .env.local

Copy the refresh token from the terminal output and add it to your `.env.local`:

```env
SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

### Step 7: Restart Your Server

Restart your development server for the changes to take effect.

## Using a Different Port

The default port is 8000. If you want to use a different port:

1. Update `package.json` dev script to use your preferred port:
   ```json
   "dev": "next dev --turbopack -p YOUR_PORT"
   ```

2. Update both helper scripts:
   - `exchange-spotify-code.js` (line 31 and 107)
   - `get-spotify-auth-url.js` (line 7)

   Change to your preferred port:
   ```javascript
   const REDIRECT_URI = 'http://127.0.0.1:YOUR_PORT/callback';
   ```

**Note:** You don't need to update your Spotify Dashboard - loopback addresses work with any port!

## Troubleshooting

### "Invalid redirect URI"
- Make sure the redirect URI in your code exactly matches what's in your Spotify Dashboard
- Check for trailing slashes - they matter!

### "Authorization code expired"
- Authorization codes are only valid for 10 minutes
- Get a new code by starting from Step 2 again

### "Invalid client"
- Check that your `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET` in `.env.local` are correct

## How It Works

1. User authorizes the app → Spotify redirects to `/callback?code=XXX`
2. The `/callback` page displays the authorization code
3. You exchange the code for a refresh token using the script
4. The refresh token is stored in `.env.local`
5. Your app uses the refresh token to get temporary access tokens (valid for 1 hour)
6. When an access token expires, your app automatically gets a new one using the refresh token

The refresh token doesn't expire (unless you revoke access), so you only need to do this setup once!
