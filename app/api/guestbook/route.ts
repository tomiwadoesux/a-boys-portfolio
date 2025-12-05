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