import { NextRequest, NextResponse } from 'next/server';
import { InferenceClient } from '@huggingface/inference';
import { writeClient } from '../../../sanity/lib/client';
import sharp from 'sharp';

const client = new InferenceClient(process.env.HF_TOKEN);

// Regional stamp style variations
const getStampStyleVariation = (country: string): string => {
  const countryLower = country.toLowerCase();

  // Tropical regions
  if (['jamaica', 'bahamas', 'barbados', 'cuba', 'haiti', 'dominican republic', 'trinidad and tobago',
       'fiji', 'samoa', 'maldives', 'seychelles', 'mauritius'].some(c => countryLower.includes(c))) {
    return 'with vibrant tropical colors, palm trees, and ocean blues';
  }

  // Nordic/Cold regions
  if (['norway', 'sweden', 'finland', 'iceland', 'denmark', 'greenland'].some(c => countryLower.includes(c))) {
    return 'with cool arctic blues, snow-capped mountains, and northern lights motifs';
  }

  // Middle Eastern
  if (['saudi arabia', 'uae', 'qatar', 'jordan', 'egypt', 'morocco', 'tunisia'].some(c => countryLower.includes(c))) {
    return 'with warm desert tones, golden yellows, and intricate geometric patterns';
  }

  // Asian
  if (['japan', 'china', 'korea', 'thailand', 'vietnam', 'indonesia'].some(c => countryLower.includes(c))) {
    return 'with traditional Asian aesthetics, cherry blossoms or bamboo elements, and rich reds and golds';
  }

  // African
  if (['nigeria', 'kenya', 'south africa', 'ghana', 'ethiopia', 'tanzania', 'morocco'].some(c => countryLower.includes(c))) {
    return 'with warm earthy tones, savanna colors, and traditional African patterns';
  }

  // Default
  return 'with classic vintage postcard aesthetics';
};

export async function POST(request: NextRequest) {
  try {
    const { entryId, city, country } = await request.json();

    if (!entryId || !country) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log(`Generating stamp for ${city ? city + ', ' : ''}${country}`);

    // Get regional style variation
    const styleVariation = getStampStyleVariation(country);

    // Generate the stamp image with location-specific prompt
    const location = city ? `${city}, ${country}` : country;
    const prompt = `A vintage-style cartoon postage stamp, designed like a commemorative card. The stamp itself is rectangular with serrated edges and features a subtle decorative border. The central image depicts a classic cartoon illustration of a popular landmark in ${location}. The overall color palette is warm and vintage, reminiscent of old postcards, with faded blues, yellows, and earthy tones ${styleVariation}. Low quality, simple illustration, not photorealistic.`;

    console.log('Generating image with prompt:', prompt);

    const imageBlob = await client.textToImage({
      provider: 'nscale',
      model: 'stabilityai/stable-diffusion-xl-base-1.0',
      inputs: prompt,
      parameters: {
        num_inference_steps: 5, // Low steps for lower quality/faster generation
        guidance_scale: 7.5,
      },
    });

    // Convert blob to buffer
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compress the image using sharp
    // Convert to WebP for better compression (or keep as JPEG/PNG with compression)
    const compressedBuffer = await sharp(buffer)
      .resize(800, 800, { // Resize to max 800x800 (maintain aspect ratio)
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toBuffer();

    console.log(`Original size: ${(buffer.length / 1024 / 1024).toFixed(2)}MB, Compressed size: ${(compressedBuffer.length / 1024 / 1024).toFixed(2)}MB`);

    // Upload to Sanity
    const asset = await writeClient.assets.upload('image', compressedBuffer, {
      filename: `stamp-${entryId}-${Date.now()}.webp`,
      contentType: 'image/webp',
    });

    console.log('Uploaded stamp to Sanity:', asset._id);

    // Update the guestbook entry with the stamp image
    await writeClient
      .patch(entryId)
      .set({
        stampImage: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: asset._id,
          },
        },
        stampGenerating: false,
      })
      .commit();

    console.log('Successfully updated entry with stamp');

    return NextResponse.json({
      success: true,
      assetId: asset._id,
    });
  } catch (error) {
    console.error('Error generating stamp:', error);

    // If stamp generation fails, update the entry to show it's no longer generating
    const { entryId } = await request.json();
    if (entryId) {
      try {
        await writeClient
          .patch(entryId)
          .set({ stampGenerating: false })
          .commit();
      } catch (updateError) {
        console.error('Failed to update entry after error:', updateError);
      }
    }

    return NextResponse.json(
      {
        error: 'Failed to generate stamp',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
