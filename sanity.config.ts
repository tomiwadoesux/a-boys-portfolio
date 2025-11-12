import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { schema } from './sanity/schemaTypes'
import { structure } from './sanity/desk-structure'
import { apiVersion, dataset, projectId } from './sanity/env'

export default defineConfig({
  name: 'default',
  title: 'A Boys Portfolio',
  basePath: '/studio',

  projectId,
  dataset,

  cors: {
    credentials: true,
    origin: [
      'http://localhost:3000',
      'http://localhost:3333',
      'https://ayotomcs.me',
    ],
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],

  schema,
})
