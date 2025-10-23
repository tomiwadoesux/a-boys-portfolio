# Static Site Generation (SSG) Setup

Your portfolio has been configured to pre-render all pages at build time for maximum performance!

## What Changed

### 1. Next.js Configuration ([next.config.mjs](next.config.mjs))
- Changed `output` from `'standalone'` to `'export'` for full static generation
- Set `images.unoptimized: true` (required for static export)
- Added `trailingSlash: true` for consistent routing

### 2. Page Metadata
Added SEO metadata exports to all pages:
- [/app/page.js](app/page.js) - Home page
- [/app/projects/page.js](app/projects/page.js) - Projects page
- [/app/guestbook/page.js](app/guestbook/page.js) - Guestbook page
- [/app/now/page.js](app/now/page.js) - Now page
- [/app/logoo/page.js](app/logoo/page.js) - Logo page

### 3. Build Script
Created [build-static.sh](build-static.sh) to handle the build process, which:
- Temporarily moves `/studio` and `/api` folders (they require server-side features)
- Runs the Next.js build
- Restores the folders after build

## Pre-rendered Pages

The following pages are now pre-rendered as static HTML:

✓ `/` - Home page (1.58 kB)
✓ `/projects` - Projects page (1.58 kB)
✓ `/guestbook` - Guestbook page (6.39 kB)
✓ `/now` - Now page (168 B)
✓ `/logoo` - Logo page (123 B)
✓ `/lab` - Lab page (3.63 kB)
✓ `/screens` - Screens page (7.37 kB)
✓ `/list` - List page (168 B)
✓ `/test` - Test page (18.4 kB)

## How to Build

### For Static Site (Production)
```bash
npm run build:static
```

This will create a fully static site in the `out/` directory that you can deploy to:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

### For Development
```bash
npm run dev
```

## Important Notes

### API Routes & Sanity Studio
The `/api` and `/studio` routes are **excluded** from the static build because they require server-side features:

1. **Sanity Studio** (`/studio`): Requires dynamic server rendering
   - **Solution**: Deploy the studio separately at https://your-project.sanity.studio
   - Or use a separate server deployment for the studio

2. **API Routes** (`/api/guestbook`): Won't work in static export
   - **Solution for Guestbook**:
     - Use Sanity Forms: https://www.sanity.io/docs/forms
     - Or use a third-party form service (Formspree, Netlify Forms, etc.)
     - Or deploy API routes separately as serverless functions

### Current Limitations
- Guestbook form submissions won't work (uses `/api/guestbook`)
- Sanity Studio won't be accessible at `/studio`
- No server-side rendering or API routes

### Hybrid Deployment Option
If you need both static pages AND server features:

1. Remove `output: 'export'` from [next.config.mjs](next.config.mjs)
2. Use `npm run build` instead of `npm run build:static`
3. Deploy to Vercel or another platform that supports Next.js server features

This will keep server-side rendering for the studio/api while still pre-rendering other pages.

## Benefits of Static Export

✓ **Lightning Fast**: Pre-rendered HTML served instantly
✓ **SEO Optimized**: Search engines can easily crawl static pages
✓ **Cost Effective**: Can be hosted on free static hosting services
✓ **Scalable**: No server required, handles high traffic easily
✓ **Secure**: No server-side code to exploit

## Deployment

### Vercel (Recommended)
```bash
vercel --prod
```

### Netlify
```bash
netlify deploy --prod --dir=out
```

### GitHub Pages
Push the `out/` directory to your `gh-pages` branch

### Manual
Upload the contents of the `out/` directory to any static hosting service

---

**Questions?** Check the [Next.js Static Export docs](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
