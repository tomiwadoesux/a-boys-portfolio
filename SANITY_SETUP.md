# Sanity CMS Setup Guide

Your portfolio is now integrated with Sanity CMS! You can manage your **Now** entries and **Projects** directly from the Sanity Studio.

## Accessing Sanity Studio

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Studio in your browser:
   ```
   http://localhost:3000/studio
   ```

## Managing Content

### Now Entries

1. In the Studio, click on **"Now"** in the sidebar
2. Click **"Create new Now"** to add a new entry
3. Fill in the fields:
   - **Date**: Format as `DD.MMM.YYYY` (e.g., `17.Oct.2025`)
   - **Text**: What you're doing or thinking about right now
   - **Display Order**: Number to control the order (lower numbers appear first)
4. Click **Publish** to save

### Projects

1. In the Studio, click on **"Project"** in the sidebar
2. Click **"Create new Project"** to add a new project
3. Fill in the fields:
   - **Title**: Project name
   - **Subtitle**: Project category/type
   - **Technology Stack**: Technologies used (e.g., "Next.js & GSAP")
   - **Project Image**: Upload your project image
   - **Image Alt Text**: Description for accessibility
   - **Project Video** (optional): Upload a video showcase
   - **Project Link**: URL to the live project
   - **Featured**: Toggle to feature this project prominently
   - **Figure Caption**: Short caption
   - **Description**: Detailed project description
   - **Display Order**: Number to control the order
4. Click **Publish** to save

## How It Works

### Data Flow

1. **Content Creation**: You create/edit content in Sanity Studio at `/studio`
2. **Data Storage**: Content is stored in Sanity's cloud
3. **Data Fetching**: Your Next.js app fetches the data when pages load
4. **Display**: Components render the data from Sanity

### File Structure

```
/sanity
  /lib
    client.ts       # Sanity client configuration
    fetch.ts        # Functions to fetch data
    queries.ts      # GROQ queries for data
  /schemaTypes
    index.ts        # Schema registry
    now.ts          # Now entry schema
    project.ts      # Project schema
  structure.ts      # Studio structure
  env.ts            # Environment variables

/app
  /components
    Now.js                  # Now component (fetches from Sanity)
    ProjectGrid.js          # Project grid component
    ProjectGridWrapper.js   # Server wrapper for fetching projects
  /studio/[[...tool]]
    page.tsx        # Sanity Studio page
```

## Components Updated

### Now Component
- Now fetches data from Sanity using `getNowData()`
- Located at: `app/components/Now.js`

### Projects Component
- Now fetches data from Sanity using `getProjects()`
- Uses a wrapper pattern: `ProjectGridWrapper.js` fetches data and passes to `ProjectGrid.js`

## Environment Variables

Make sure you have these in your `.env.local` file:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
```

## Migrating Existing Data

To migrate your existing data from `app/data/now.js` and `app/data/projects.js`:

1. Go to http://localhost:3000/studio
2. Manually create entries using the data from your files
3. Or use the Sanity CLI to import data (see Sanity docs)

## Tips

- **Revalidation**: Pages will automatically show new content when you publish in Sanity
- **Preview**: Use the Vision tool in Studio to test GROQ queries
- **Ordering**: Use the `order` field to control the sequence of items
- **Featured Projects**: Toggle the `featured` flag to highlight specific projects

## Troubleshooting

### Studio not loading?
- Check that your environment variables are set correctly
- Make sure `sanity.config.ts` exists in the root

### Data not showing?
- Check the browser console for errors
- Verify data exists in Sanity Studio
- Check that `order` field is set on all entries

### Need to reset?
- You can always fall back to the static data files if needed
- Just import from `app/data/now.js` or `app/data/projects.js` again

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js with Sanity](https://www.sanity.io/guides/sanity-nextjs-guide)
