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

// Function to send email notification
async function sendEmailNotification(entry: any) {
  console.log('Email notification would be sent for entry:', entry._id);
}

// Function to trigger stamp generation in background with retry logic
async function triggerStampGeneration(entryId: string, country: string, request: NextRequest) {
  const attemptStampGeneration = async (attempt: number = 1) => {
    console.log(`Attempting stamp generation for entry ${entryId} (attempt ${attempt}/5)`);

    try {
      // Get the base URL from the request headers
      const host = request.headers.get('host');
      const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
                      (host === 'ayotomcs.me' ? 'https://ayotomcs.me' : `${protocol}://${host}`);
      
      console.log('Using base URL for stamp generation:', baseUrl);
      
      const response = await fetch(`${baseUrl}/api/generate-stamp`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entryId, country }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Stamp generation failed with status ${response.status}:`, errorText);
        throw new Error(`API error: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      console.log(`Stamp generation successful for entry ${entryId}:`, result);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      console.error(`Stamp generation attempt ${attempt} failed:`, errorMessage);

      // Exponential backoff: 30s, 60s, 120s, 240s
      if (attempt < 5) {
        const waitTime = Math.pow(2, attempt - 1) * 30000; // 30s * 2^(attempt-1)
        const waitSeconds = waitTime / 1000;
        console.log(`Retrying stamp generation in ${waitSeconds}s...`);

        await new Promise(resolve => setTimeout(resolve, waitTime));
        await attemptStampGeneration(attempt + 1);

      } else {
        console.error(`Final stamp generation failure for entry ${entryId} after 5 attempts.`);
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

  // Start the process but don't wait for it
  attemptStampGeneration(1).catch(err => {
    console.error('Unhandled error in stamp generation:', err);
  });
  
  console.log('Stamp generation triggered for entry:', entryId);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Received guestbook submission:', body);
    console.log('Sanity token present:', !!process.env.SANITY_API_TOKEN);
    console.log('HF token present:', !!process.env.HF_TOKEN);

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
      date: new Date().toISOString(), // Use server-side date
      approved: true,
      stampGenerating: true,
      reactions: 0,
      isFirstFromCountry: firstFromCountry,
    });

    console.log('Successfully created entry:', newEntry._id);
    console.log('First from country:', firstFromCountry);

    // Trigger stamp generation in background (non-blocking)
    console.log('Triggering stamp generation with country:', country);
    triggerStampGeneration(newEntry._id, country, request);

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
      details: error instanceof Error ? error.stack : error
    }, { status: 500 });
  }
}