import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Read-only client for fetching data
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// Write client for browser (uses public token with write permissions)
// IMPORTANT: Create a token with "Editor" role in Sanity and add it to your .env.local
// as NEXT_PUBLIC_SANITY_WRITE_TOKEN
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_WRITE_TOKEN,
})
