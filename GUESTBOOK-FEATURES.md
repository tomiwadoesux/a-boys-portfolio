# Guestbook Features Documentation

## Overview
The guestbook now includes AI-generated stamps, auto-location detection, reactions, and achievement badges!

## New Features

### 1. **Auto-Location Detection**
- Visitors no longer need to select their country
- Location is automatically detected using IP geolocation (ipapi.co)
- Detects both city and country for more accurate stamps

### 2. **AI-Generated Stamps**
- Each guestbook entry gets a unique vintage-style stamp
- Generated using Hugging Face's Stable Diffusion XL model
- Stamps feature landmarks from the visitor's location
- Regional style variations:
  - **Tropical regions**: Vibrant colors, palm trees, ocean blues
  - **Nordic regions**: Cool arctic blues, snow-capped mountains
  - **Middle Eastern**: Warm desert tones, golden yellows
  - **Asian**: Traditional aesthetics, cherry blossoms, reds and golds
  - **African**: Warm earthy tones, savanna colors

### 3. **Stamp Generation Process**
- Stamps are generated asynchronously (visitors don't wait)
- Shows "Generating stamp..." placeholder while processing
- Automatic retry mechanism if generation fails
- Stamp appears with animated "stamping" effect when ready
- Low-quality generation (5 inference steps) for faster results

### 4. **Reactions System**
- Visitors can "like" guestbook entries with a heart icon
- Each visitor can only react once per entry (client-side prevention)
- Real-time reaction counter
- Smooth animations when reacting

### 5. **Achievement Badges**
- "First from Country" badge for the first signer from each country
- Displayed as a golden star badge in the top-right corner
- Automatically detected and awarded on submission

### 6. **Enhanced UI**
- Beautiful stamp display with vintage styling
- Loading animations for stamp generation
- Smooth transitions and hover effects
- Responsive design for all screen sizes

## Technical Implementation

### API Endpoints

#### `/api/guestbook` (POST)
- Creates new guestbook entry
- Auto-detects visitor location
- Triggers background stamp generation
- Returns success message immediately

#### `/api/generate-stamp` (POST)
- Generates AI stamp using Hugging Face
- Uploads stamp to Sanity assets
- Updates guestbook entry with stamp image
- Includes retry logic on failure

#### `/api/guestbook/react` (POST)
- Increments reaction count for an entry
- Updates Sanity document

### Sanity Schema Updates

New fields added to guestbook schema:
```typescript
- city: string // Auto-detected city
- stampImage: image // AI-generated stamp
- stampGenerating: boolean // Generation status
- reactions: number // Like count
- isFirstFromCountry: boolean // Achievement badge
```

### Environment Variables

Required in `.env.local`:
```bash
HF_TOKEN=your_hugging_face_token
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Update for production
```

## Deployment Checklist

### Before Deploying:

1. **Update Environment Variables**
   - Set `NEXT_PUBLIC_BASE_URL` to your production URL
   - Verify `HF_TOKEN` is set correctly
   - All Sanity tokens are configured

2. **Sanity Studio**
   - Deploy updated schema to Sanity Studio
   - Run migrations if needed

3. **Test Locally**
   - Submit a test guestbook entry
   - Verify location detection works
   - Check stamp generation completes
   - Test reactions functionality
   - Verify achievement badges appear

4. **Production Deployment**
   - Deploy to Vercel/your hosting platform
   - Update `NEXT_PUBLIC_BASE_URL` environment variable
   - Test with real IP addresses (not localhost)

### Known Limitations:

1. **IP Detection on Localhost**
   - Location detection won't work on localhost
   - Will default to "Unknown, Unknown"
   - Test on staging/production for accurate results

2. **Hugging Face Rate Limits**
   - Free tier has rate limits
   - Consider upgrade for high traffic
   - Retry mechanism helps handle temporary failures

3. **Image Generation Time**
   - Stamps typically take 10-30 seconds to generate
   - Some may take up to 2 minutes
   - Retry happens after 30 seconds on first failure

## Future Enhancements (Optional)

### Email Notifications
- Implement email notifications when someone signs the guestbook
- Use Resend or SendGrid API
- Update `sendEmailNotification()` function in `/api/guestbook/route.ts`

### Caching
- Consider caching stamps by location to reduce API calls
- Add Redis or similar for faster repeated requests

### Admin Dashboard
- Build admin panel for managing entries
- Bulk approve/delete functionality
- Analytics on visitor locations

### Rate Limiting
- Add rate limiting to prevent spam
- Limit entries per IP address per day
- Use middleware or edge functions

## Troubleshooting

### Stamps Not Generating
1. Check HF_TOKEN is valid
2. Verify BASE_URL is correct
3. Check Sanity write permissions
4. Review server logs for errors

### Location Not Detecting
1. Ensure not testing on localhost
2. Check ipapi.co API status
3. Verify IP headers are present

### Reactions Not Working
1. Check Sanity write token permissions
2. Verify entry ID is being passed correctly
3. Review browser console for errors

## API Credits & Costs

- **ipapi.co**: Free tier allows 1,000 requests/day
- **Hugging Face**: Free tier with rate limits
- **Sanity**: Check your plan's asset storage limits

Consider upgrading plans based on traffic volume.

## Support

For issues or questions:
1. Check server logs in Vercel dashboard
2. Review Sanity Studio for data consistency
3. Test with different browsers/devices
4. Check network tab for failed API calls
