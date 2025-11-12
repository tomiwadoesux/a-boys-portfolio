import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { writeClient } from '../../../sanity/lib/client';
import { groq } from 'next-sanity';
import { client } from '../../../sanity/lib/client';


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

// Function to trigger stamp generation in background with retry logic
async function triggerStampGeneration(entryId: string, country:string) {
  // Use the configured base URL or detect from headers
  // On Vercel, we can use relative URLs which work on the same server
  const attemptStampGeneration = async (attempt: number = 1) => {
    console.log(`Attempting stamp generation for entry ${entryId} (attempt ${attempt}/5)`);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
      console.log('Using base URL for stamp generation:', baseUrl);
      const response = await fetch(`/api/generate-stamp/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entryId, country }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        throw new Error(errorBody.error || `API error: ${response.status}`);
      }
      
      console.log(`Stamp generation successful for entry ${entryId}`);

    } catch (error) {
      console.error(`Stamp generation attempt ${attempt} failed:`, error.message);

      // Exponential backoff: 30s, 60s, 120s, 240s (up to 4.5 minutes)
      if (attempt < 5) {
        const waitTime = Math.pow(2, attempt - 1) * 30000; // 30s * 2^(attempt-1)
        const waitSeconds = waitTime / 1000;
        console.log(`Retrying stamp generation in ${waitSeconds}s...`);

        // Use a promise to wait for setTimeout
        await new Promise(resolve => setTimeout(resolve, waitTime));
        await attemptStampGeneration(attempt + 1);

      } else {
        console.error(`Final stamp generation failure for entry ${entryId} after 5 attempts. Entry may need manual retry.`);
        // Optionally, update the Sanity entry to reflect the failure
        try {
          await writeClient
            .patch(entryId)
            .set({ stampGenerating: false, stampError: true })
            .commit();
        } catch (patchError) {
          console.error(`Failed to patch entry ${entryId} after final failure:`, patchError);
        }
      }
    }
  };

  // No need to await here, let it run in the background
  attemptStampGeneration(1);
  console.log('Stamp generation triggered for entry:', entryId);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Received guestbook submission:', body);
    console.log('Sanity token present:', !!process.env.SANITY_API_TOKEN);

    // Use country from form submission
    const country = body.country || 'Unknown Country';
    console.log('Country from form:', country);

    // Check if this is the first entry from this country
    const firstFromCountry = await isFirstFromCountry(country);

    const newEntry = await writeClient.create({
      _type: 'guestbook',
      name: body.name,
      message: body.message,
      country: country,
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
    console.log('Triggering stamp generation with country:', country);
    triggerStampGeneration(newEntry._id, country);

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