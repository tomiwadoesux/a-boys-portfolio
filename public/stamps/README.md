# Guestbook Stamps

This folder contains the stamp images used in the guestbook feature.

## Adding Stamp Images

To add images for the countries in your guestbook:

1. Add image files to this folder with the following naming convention:
   - `nigeria.jpg`
   - `usa.jpg`
   - `uk.jpg`
   - `canada.jpg`
   - etc.

2. Recommended image specifications:
   - **Aspect Ratio**: 4:5 (e.g., 300x375px or 600x750px)
   - **Format**: JPG, PNG, or WebP
   - **File Size**: Keep under 200KB for optimal performance
   - **Content**: Landmarks, flags, cultural symbols, or scenic views

3. Add a `default.jpg` image as a fallback for countries without specific images.

## Quick Setup

If you don't have stamp images yet, you can:

### Option 1: Use Placeholder Images
Create simple placeholder images or use free stock photos from:
- [Unsplash](https://unsplash.com/)
- [Pexels](https://pexels.com/)
- [Pixabay](https://pixabay.com/)

### Option 2: Use a Solid Color
Create a simple solid color image as a default stamp background.

### Option 3: Disable Images Temporarily
The guestbook will still work without images - they just won't show background imagery in the stamps.

## Example Structure

```
public/stamps/
├── nigeria.jpg
├── usa.jpg
├── uk.jpg
├── canada.jpg
├── germany.jpg
├── france.jpg
├── japan.jpg
├── australia.jpg
├── brazil.jpg
├── india.jpg
├── china.jpg
├── south-africa.jpg
├── mexico.jpg
├── spain.jpg
├── italy.jpg
├── south-korea.jpg
├── netherlands.jpg
├── sweden.jpg
├── norway.jpg
├── denmark.jpg
└── default.jpg
```

## Notes

- The stamp images are displayed with reduced opacity (45%) as backgrounds
- Images are styled with CSS filters for a consistent look
- The guestbook is fully functional without images - they're purely decorative
