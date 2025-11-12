import { NextRequest, NextResponse } from "next/server";
import { InferenceClient } from "@huggingface/inference";
import { writeClient } from "../../../sanity/lib/client";
import sharp from "sharp";

if (!process.env.HF_TOKEN) {
  console.error('HF_TOKEN is not set in environment variables');
  throw new Error('Missing Hugging Face API token');
}

const client = new InferenceClient(process.env.HF_TOKEN);

// Regional stamp style variations
const getStampStyleVariation = (country: string): string => {
  // Handle empty or invalid country values
  if (!country || country.toLowerCase() === 'unknown' || country.toLowerCase() === 'unknown country') {
    return "with classic vintage postcard aesthetics and global travel motifs";
  }

  const countryLower = country.toLowerCase();

  // Tropical regions
  if (
    [
      "jamaica",
      "bahamas",
      "barbados",
      "cuba",
      "haiti",
      "dominican republic",
      "trinidad and tobago",
      "fiji",
      "samoa",
      "maldives",
      "seychelles",
      "mauritius",
    ].some((c) => countryLower.includes(c))
  ) {
    return "with vibrant tropical colors, palm trees, and ocean blues";
  }

  // Nordic/Cold regions
  if (
    ["norway", "sweden", "finland", "iceland", "denmark", "greenland"].some(
      (c) => countryLower.includes(c)
    )
  ) {
    return "with cool arctic blues, snow-capped mountains, and northern lights motifs";
  }

  // Middle Eastern
  if (
    [
      "saudi arabia",
      "uae",
      "qatar",
      "jordan",
      "egypt",
      "morocco",
      "tunisia",
    ].some((c) => countryLower.includes(c))
  ) {
    return "with warm desert tones, golden yellows, and intricate geometric patterns";
  }

  // Asian
  if (
    ["japan", "china", "korea", "thailand", "vietnam", "indonesia"].some((c) =>
      countryLower.includes(c)
    )
  ) {
    return "with traditional Asian aesthetics, cherry blossoms or bamboo elements, and rich reds and golds";
  }

  // African
  if (
    [
      "nigeria",
      "kenya",
      "south africa",
      "ghana",
      "ethiopia",
      "tanzania",
      "morocco",
    ].some((c) => countryLower.includes(c))
  ) {
    return "with warm earthy tones, savanna colors, and traditional African patterns";
  }

  // Development/Local testing
  if (
    ["development", "local", "worldwide", "internet"].some((c) =>
      countryLower.includes(c)
    )
  ) {
    return "with classic vintage postcard aesthetics and international travel themes";
  }

  // Default
  return "with classic vintage postcard aesthetics";
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { entryId, country } = body;

  try {
    if (!entryId || !country) {
      // Log the received body for easier debugging of malformed requests
      console.error("Missing required fields in request body:", body);
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    console.log(`Generating stamp for ${country}`);

    // Get regional style variation
    const styleVariation = getStampStyleVariation(country);

    // Generate the stamp image with location-specific prompt
    const location = country;
    const artStyles = [
      "1930s WPA travel poster style",
      "1940s-50s mid-century modern illustration",
      "Tintin ligne claire comic style",
      "1950s Disney cartoon style",
      "Art Deco travel poster aesthetic",
      "1960s Hanna-Barbera cartoon style",
      "vintage Japanese woodblock-inspired cartoon",
      "1940s propaganda poster illustration style",
      "retro airline poster art",
      "old National Parks poster style",
    ];

    const weatheringStates = [
      "pristine vintage-style reproduction",
      "slightly faded and aged",
      "heavily weathered with foxing and discoloration",
      "sun-bleached and worn",
      "water-stained and yellowed",
    ];

    const perspectives = [
      "perfectly flat, straight-on view",
      "slightly tilted at an angle",
      "photographed from above with subtle shadows",
      "corner curled up slightly",
    ];

    const postmarkStyles = [
      "with a circular postmark overlay",
      "with wavy cancellation lines across",
      "with a partial postal cancellation stamp",
      "unmarked and mint condition",
      "with multiple overlapping postmarks",
    ];

    // Randomly select from each array
    const selectedArtStyle =
      artStyles[Math.floor(Math.random() * artStyles.length)];
    const selectedWeathering =
      weatheringStates[Math.floor(Math.random() * weatheringStates.length)];
    const selectedPerspective =
      perspectives[Math.floor(Math.random() * perspectives.length)];
    const selectedPostmark =
      postmarkStyles[Math.floor(Math.random() * postmarkStyles.length)];
    const year = Math.floor(Math.random() * (1970 - 1920) + 1920); // Random year between 1920-1970

    const prompt = `A low-quality vintage postage stamp, ${selectedPerspective}. ${selectedArtStyle} cartoon illustration inspired by the traditional art, symbols, and textile patterns of ${location}. It should reflect ${styleVariation}, featuring iconic cultural motifs or decorative designs typical of the region — such as local patterns, ornaments, or folk art shapes. The stamp has perforated edges with visible paper texture and printing imperfections. ${selectedWeathering}. ${selectedPostmark}. Warm nostalgic palette using colors inspired by the region’s landscape and traditional crafts. Off-register color printing, faded inks, halftone dots, and misaligned lines. The illustration is minimal, with simplified geometric shapes, no text, and no photorealism. Paper shows wear, creases, and gum residue — like an old, collectible travel souvenir.`;
     console.log("Generating image with prompt:", prompt);

    const imageBlob = await client.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: {
        num_inference_steps: 10, // Increased steps for better quality
        guidance_scale: 7.5,
      },
    });

    // Convert blob to buffer
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Compress the image using sharp
    // Convert to WebP for better compression (or keep as JPEG/PNG with compression)
    const compressedBuffer = await sharp(buffer)
      .resize(800, 800, {
        // Resize to max 800x800 (maintain aspect ratio)
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 }) // Convert to WebP with 80% quality
      .toBuffer();

    console.log(
      `Original size: ${(buffer.length / 1024 / 1024).toFixed(2)}MB, Compressed size: ${(compressedBuffer.length / 1024 / 1024).toFixed(2)}MB`
    );

    // Upload to Sanity
    const asset = await writeClient.assets.upload("image", compressedBuffer, {
      filename: `stamp-${entryId}-${Date.now()}.webp`,
      contentType: "image/webp",
    });

    console.log("Uploaded stamp to Sanity:", asset._id);

    // Update the guestbook entry with the stamp image
    await writeClient
      .patch(entryId)
      .set({
        stampImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: asset._id,
          },
        },
        stampGenerating: false,
      })
      .commit();

    console.log("Successfully updated entry with stamp");

    return NextResponse.json({
      success: true,
      assetId: asset._id,
    });
  } catch (error) {
    console.error("Error generating stamp:", error);

    // If stamp generation fails, update the entry to show it's no longer generating
    if (entryId) {
      try {
        await writeClient
          .patch(entryId)
          .set({ stampGenerating: false })
          .commit();
      } catch (updateError) {
        console.error("Failed to update entry after error:", updateError);
      }
    }

    return NextResponse.json(
      {
        error: "Failed to generate stamp",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}