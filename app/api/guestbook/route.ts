import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { writeClient } from '../../../sanity/lib/client';
import { groq } from 'next-sanity';
import { client } from '../../../sanity/lib/client';

// Function to get visitor location from IP
async function getVisitorLocation(request: NextRequest) {
  try {
    // Try to get IP from various headers (Vercel, Cloudflare, etc.)
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';

    console.log('Detected IP:', ip);

    // If localhost or unknown, return default with better labels
    if (ip === 'unknown' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
      return { city: 'Local', region: '', country: 'Development' };
    }

    // Use ipapi.co for geolocation (free tier: 1000 requests/day)
    const response = await fetch(`https://ipapi.co/${ip}/json/`);

    if (!response.ok) {
      console.error('Failed to fetch location:', response.statusText);
      return { city: 'Unknown', region: 'Unknown', country: 'Unknown' };
    }

    const data = await response.json();

    return {
      city: data.city || 'Unknown',
      region: data.region || 'Unknown',
      country: data.country_name || 'Unknown',
    };
  } catch (error) {
    console.error('Error getting visitor location:', error);
    return { city: 'Unknown', region: 'Unknown', country: 'Unknown' };
  }
}

// Function to check if this is the first entry from a country
async function isFirstFromCountry(country: string): Promise<boolean> {
  const query = groq`count(*[_type == "guestbook" && country == $country])`;
  const count = await client.fetch<number>(query, { country });
  return count === 0;
}

// Function to send email notification (we'll implement this later)
async function sendEmailNotification(entry: any) {
  // TODO: Implement email notification using Resend or similar service
  console.log('Email notification would be sent for entry:', entry._id);
}

// Function to trigger stamp generation in background
async function triggerStampGeneration(entryId: string, city: string, country: string) {
  try {
    // Call the stamp generation API endpoint
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Use fetch with no-wait pattern for background execution
    fetch(`${baseUrl}/api/generate-stamp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId, city, country }),
    }).catch(error => {
      console.error('Background stamp generation failed:', error);

      // Retry after 30 seconds if it fails
      setTimeout(() => {
        fetch(`${baseUrl}/api/generate-stamp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entryId, city, country }),
        }).catch(retryError => {
          console.error('Retry stamp generation failed:', retryError);
        });
      }, 30000);
    });

    console.log('Stamp generation triggered for entry:', entryId);
  } catch (error) {
    console.error('Error triggering stamp generation:', error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Received guestbook submission:', body);
    console.log('Sanity token present:', !!process.env.SANITY_API_TOKEN);

    // Auto-detect visitor location
    const location = await getVisitorLocation(request);
    console.log('Detected location:', location);

    // Check if this is the first entry from this country
    const firstFromCountry = await isFirstFromCountry(location.country);

    const newEntry = await writeClient.create({
      _type: 'guestbook',
      name: body.name,
      message: body.message,
      city: location.city,
      region: location.region,
      country: location.country,
      link: body.link || null,
      date: new Date().toISOString(),
      approved: true,
      stampGenerating: true,
      reactions: 0,
      isFirstFromCountry: firstFromCountry,
    });

    console.log('Successfully created entry:', newEntry._id);
    console.log('First from country:', firstFromCountry);

    // Trigger stamp generation in background (non-blocking)
    triggerStampGeneration(newEntry._id, location.city, location.country);

    // Send email notification (non-blocking)
    sendEmailNotification(newEntry).catch(console.error);

    revalidatePath('/guestbook');

    return NextResponse.json({
      ...newEntry,
      success: true,
      statusMessage: 'Thank you for signing! Your signature will be added shortly.',
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting guestbook entry:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      message: 'Error submitting guestbook entry',
      error: errorMessage,
      details: error
    }, { status: 500 });
  }
}