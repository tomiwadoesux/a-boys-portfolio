'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// Note: Sanity Studio requires server-side features and won't work with static export
// For production, consider deploying the studio separately or using a server deployment

export default function StudioPage() {
  return <NextStudio config={config} />
}
