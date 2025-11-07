import { createClient } from '@sanity/client';
import { InferenceClient } from '@huggingface/inference';
import sharp from 'sharp';
import { config } from 'dotenv';

config({ path: '.env.local' });

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: false,
  apiVersion: '2025-10-17',
  token: process.env.SANITY_API_TOKEN,
});

const inferenceClient = new InferenceClient(process.env.HF_TOKEN);

const getStampStyleVariation = (country) => {
  if (!country || country === 'unknown' || country === 'Unknown Country') {
    return "with classic vintage postcard aesthetics and global travel motifs";
  }

  const countryLower = country.toLowerCase();

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

  if (
    ["norway", "sweden", "finland", "iceland", "denmark", "greenland"].some(
      (c) => countryLower.includes(c)
    )
  ) {
    return "with cool arctic blues, snow-capped mountains, and northern lights motifs";
  }

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

  if (
    ["japan", "china", "korea", "thailand", "vietnam", "indonesia"].some((c) =>
      countryLower.includes(c)
    )
  ) {
    return "with traditional Asian aesthetics, cherry blossoms or bamboo elements, and rich reds and golds";
  }

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

  if (
    ["development", "local", "worldwide", "internet"].some((c) =>
      countryLower.includes(c)
    )
  ) {
    return "with classic vintage postcard aesthetics and international travel themes";
  }

  return "with classic vintage postcard aesthetics";
};

async function generateStamp(entry) {
  try {
    console.log(`Generating stamp for ${entry.name} from ${entry.city}, ${entry.country}`);

    const styleVariation = getStampStyleVariation(entry.country);
    const location = entry.country;
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

    const selectedArtStyle =
      artStyles[Math.floor(Math.random() * artStyles.length)];
    const selectedWeathering =
      weatheringStates[Math.floor(Math.random() * weatheringStates.length)];
    const selectedPerspective =
      perspectives[Math.floor(Math.random() * perspectives.length)];
    const selectedPostmark =
      postmarkStyles[Math.floor(Math.random() * postmarkStyles.length)];
    const year = Math.floor(Math.random() * (1970 - 1920) + 1920);

    const prompt = `A low-quality vintage postage stamp, ${selectedPerspective}. ${selectedArtStyle} cartoon illustration of the main airport in ${location}. The stamp has perforated/serrated edges with visible paper texture and printing imperfections. ${selectedWeathering}. ${selectedPostmark}. Warm nostalgic color palette with faded blues, yellows, ochres, and earthy burnt sienna tones. Off-register color printing with visible halftone dots and color bleeding. Deliberately crude and simple illustration with wobbly hand-drawn lines, like a cheap tourist souvenir stamp from a local print shop. Simplified geometric shapes for the landmark, minimal detail, flat color fills with no gradients. Non-photorealistic cartoon style with thick black outlines. Paper shows age spots, minor creases, and gum residue on edges. The overall composition is slightly off-center as if hastily printed. Low production value, amateurish design quality ${styleVariation}. No text, no numbers, no writing visible anywhere on the stamp.`;
    console.log("Generating image with prompt:", prompt);

    const imageBlob = await inferenceClient.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: {
        num_inference_steps: 5,
        guidance_scale: 7.5,
      },
    });

    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const compressedBuffer = await sharp(buffer)
      .resize(800, 800, {
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({ quality: 80 })
      .toBuffer();

    console.log(
      `Original size: ${(buffer.length / 1024 / 1024).toFixed(2)}MB, Compressed size: ${(compressedBuffer.length / 1024 / 1024).toFixed(2)}MB`
    );

    const asset = await sanityClient.assets.upload("image", compressedBuffer, {
      filename: `stamp-${entry._id}-${Date.now()}.webp`,
      contentType: "image/webp",
    });

    console.log("Uploaded stamp to Sanity:", asset._id);

    await sanityClient
      .patch(entry._id)
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
  } catch (error) {
    console.error("Error generating stamp:", error);
    try {
      await sanityClient
        .patch(entry._id)
        .set({ stampGenerating: false })
        .commit();
    } catch (updateError) {
      console.error("Failed to update entry after error:", updateError);
    }
  }
}

async function generateStampsForMissing() {
  try {
    console.log('Fetching guestbook entries without a stamp...\n');

    const entries = await sanityClient.fetch(
      `*[_type == "guestbook" && approved == true && !defined(stampImage)] {
        _id,
        name,
        city,
        region,
        country,
        date
      }`
    );

    console.log(`Found ${entries.length} entries without a stamp.\n`);

    for (const entry of entries) {
      await generateStamp(entry);
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

generateStampsForMissing();
