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

// Function to trigger stamp generation in background
async function triggerStampGeneration(entryId: string, country: string) {
  try {
    // Call the stamp generation API endpoint
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    // Use fetch with no-wait pattern for background execution
    fetch(`${baseUrl}/api/generate-stamp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ entryId, country }),
    }).catch(error => {
      console.error('Background stamp generation failed:', error);

      // Retry after 30 seconds if it fails
      setTimeout(() => {
        fetch(`${baseUrl}/api/generate-stamp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ entryId, country }),
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