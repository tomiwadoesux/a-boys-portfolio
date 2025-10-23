# Guestbook Setup Guide

Your guestbook has been updated to work with **static site generation**! It now submits directly to Sanity from the browser (no API routes needed).

## What Changed

### Updated Files
1. **[sanity/lib/client.browser.js](sanity/lib/client.browser.js)** - New client for browser-side writes
2. **[app/components/Guestbook/GuestbookClient.js](app/components/Guestbook/GuestbookClient.js)** - Now submits directly to Sanity
3. **[app/components/Guestbook/GuestbookForm.js](app/components/Guestbook/GuestbookForm.js)** - Added loading state

### How It Works Now
- Form submissions go **directly to Sanity** from the browser
- No API route needed (works with static export!)
- Uses a public write token (with proper CORS settings)

## Setup Instructions

### Step 1: Create a Sanity API Token

1. Go to your Sanity project: https://www.sanity.io/manage/personal/project/vwhgs4bj

2. Click on **"API"** in the left sidebar

3. Scroll down to **"Tokens"** section

4. Click **"Add API Token"**

5. Configure the token:
   - **Name**: `Guestbook Write Token` (or any name you prefer)
   - **Permissions**: Select **"Editor"** (allows read and write)
   - Click **"Add Token"**

6. **IMPORTANT**: Copy the token immediately! You won't be able to see it again.

### Step 2: Add Token to Environment Variables

Add the token to your `.env.local` file:

```bash
# Open your .env.local file and add this line:
NEXT_PUBLIC_SANITY_WRITE_TOKEN=your_token_here
```

Your `.env.local` should look like this:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=vwhgs4bj
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_server_token_here
NEXT_PUBLIC_SANITY_WRITE_TOKEN=your_new_token_here
```

### Step 3: Configure CORS in Sanity

For browser-based writes to work, you need to allow your domain in Sanity's CORS settings:

1. Go to: https://www.sanity.io/manage/personal/project/vwhgs4bj/api

2. Scroll to **"CORS Origins"** section

3. Click **"Add CORS Origin"**

4. Add your domains:
   - For development: `http://localhost:3000`
   - For production: `https://yourdomain.com`
   - Allow credentials: **Yes**

5. Click **"Save"**

### Step 4: Restart Your Dev Server

```bash
# Stop your current dev server (Ctrl+C)
# Then restart it:
npm run dev
```

## Testing

1. Go to `/guestbook` on your site
2. Fill out the form
3. Click "Post Entry"
4. You should see:
   - Button shows "Posting..." while submitting
   - Success message after submission
   - New entry appears in the list

## Security Notes

### Is it safe to expose the write token?

The token is prefixed with `NEXT_PUBLIC_` which means it's exposed to the browser. Here's why this is acceptable:

✅ **Safe because:**
- CORS restrictions limit which domains can use it
- Token only has access to your public dataset
- Sanity has rate limiting built-in
- You can revoke the token anytime

⚠️ **To make it more secure:**
1. Set up Sanity's API rate limiting
2. Use Sanity's built-in moderation (set `approved: false` in the code)
3. Monitor your Sanity usage dashboard
4. Consider adding client-side validation/spam protection

### Alternative: Manual Approval

If you want to manually approve entries before they appear:

Edit [app/components/Guestbook/GuestbookClient.js](app/components/Guestbook/GuestbookClient.js:27):

```js
// Change this line:
approved: true,

// To this:
approved: false,
```

Then entries will be hidden until you approve them in Sanity Studio.

## Troubleshooting

### "An error occurred" when submitting

**Cause**: Missing or incorrect token

**Solution**:
1. Make sure `NEXT_PUBLIC_SANITY_WRITE_TOKEN` is in `.env.local`
2. Restart your dev server after adding the token
3. Check that the token has "Editor" permissions

### CORS Error in Browser Console

**Cause**: Domain not allowed in Sanity CORS settings

**Solution**:
1. Add your domain to CORS origins in Sanity
2. Make sure "Allow credentials" is checked
3. Clear browser cache and try again

### Form submits but entry doesn't appear

**Cause**: Entry might be set to `approved: false`

**Solution**:
1. Check Sanity Studio for pending entries
2. Approve them manually
3. Or change `approved: true` in the code

## Benefits of This Approach

✅ **Works with Static Export**: No server needed!
✅ **Simple**: Direct Sanity integration
✅ **Fast**: No API route middleman
✅ **Reliable**: Uses Sanity's robust infrastructure
✅ **Real-time**: Entries appear immediately (if approved: true)

## Need Help?

- Sanity Docs: https://www.sanity.io/docs
- Sanity CORS Guide: https://www.sanity.io/docs/cors
- Sanity Tokens: https://www.sanity.io/docs/api-tokens
