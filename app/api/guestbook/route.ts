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

// Function to trigger stamp generation in background (non-blocking)
// Uses setTimeout to completely detach from the HTTP request lifecycle
function triggerStampGeneration(entryId: string, country: string) {
  // Fire-and-forget: schedule the generation to run outside the request context
  // This prevents timeouts from blocking the user's form submission
  setTimeout(async () => {
    const attemptStampGeneration = async (attempt: number = 1) => {
      console.log(`Attempting stamp generation for entry ${entryId} (attempt ${attempt}/3)`);

      try {
        // Call the API with a timeout - use internal API call path
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 55000); // 55 second timeout (leaves 5s buffer for Vercel)

        const apiUrl = process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}/api/generate-stamp`
          : `http://localhost:3000/api/generate-stamp`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ entryId, country }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`Stamp generation failed with status ${response.status}:`, errorText);
          throw new Error(`API error: ${response.status}`);
        }

        const result = await response.json();
        console.log(`Stamp generation successful for entry ${entryId}:`, result);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`Stamp generation attempt ${attempt} failed for entry ${entryId}:`, errorMessage);

        // Retry with exponential backoff: 10s, 20s, 40s (much shorter than before)
        if (attempt < 3) {
          const waitTime = Math.pow(2, attempt - 1) * 10000; // 10s * 2^(attempt-1)
          const waitSeconds = waitTime / 1000;
          console.log(`Retrying stamp generation in ${waitSeconds}s (attempt ${attempt + 1}/3)...`);

          // Use setTimeout instead of awaiting - keeps it non-blocking
          setTimeout(() => {
            attemptStampGeneration(attempt + 1);
          }, waitTime);

        } else {
          console.error(`Final stamp generation failure for entry ${entryId} after 3 attempts.`);
          try {
            await writeClient
              .patch(entryId)
              .set({
                stampGenerating: false,
                stampError: true,
                stampErrorMessage: `Failed to generate stamp after 3 attempts. Last error: ${errorMessage.substring(0, 100)}`
              })
              .commit();
            console.log(`Updated entry ${entryId} with error flag`);
          } catch (patchError) {
            console.error(`Failed to patch entry ${entryId} after final failure:`, patchError);
          }
        }
      }
    };

    // Start retries
    attemptStampGeneration(1);
  }, 100); // Small delay to ensure HTTP response is sent before starting generation

  console.log('Stamp generation scheduled for entry:', entryId);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('=== GUESTBOOK SUBMISSION START ===');
    console.log('Received guestbook submission:', body);
    console.log('Sanity token present:', !!process.env.SANITY_API_TOKEN);
    console.log('HF token present:', !!process.env.HF_TOKEN);
    console.log('NEXT_PUBLIC_BASE_URL:', process.env.NEXT_PUBLIC_BASE_URL);
    console.log('Request host:', request.headers.get('host'));

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
    triggerStampGeneration(newEntry._id, country);
    console.log('Stamp generation scheduled successfully');

    // Send email notification (non-blocking)
    sendEmailNotification(newEntry).catch(console.error);

    revalidatePath('/guestbook');

    console.log('=== GUESTBOOK SUBMISSION SUCCESS ===');

    return NextResponse.json({
      ...newEntry,
      success: true,
      statusMessage: 'Thank you for signing! Your signature will be added shortly.',
    }, { status: 201 });
  } catch (error) {
    console.error('=== GUESTBOOK SUBMISSION ERROR ===');
    console.error('Error submitting guestbook entry:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({
      message: 'Error submitting guestbook entry',
      error: errorMessage,
      details: error instanceof Error ? error.stack : error
    }, { status: 500 });
  }
}