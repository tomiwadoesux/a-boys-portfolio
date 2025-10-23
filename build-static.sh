#!/bin/bash

# Build script for static export
# This script temporarily moves server-side features (studio, api) during build

echo "Starting static build..."

# Create backup directory if it doesn't exist
mkdir -p .build-temp

# Backup next.config.mjs
echo "Backing up next.config.mjs..."
cp next.config.mjs .build-temp/next.config.mjs.backup

# Add output: 'export' to next.config.mjs
echo "Adding static export configuration..."
sed -i.bak "s/const nextConfig = {/const nextConfig = {\n  output: 'export',/" next.config.mjs
rm -f next.config.mjs.bak

# Move server-side directories
if [ -d "app/studio" ]; then
  echo "Moving studio folder..."
  mv app/studio .build-temp/
fi

if [ -d "app/api" ]; then
  echo "Moving api folder..."
  mv app/api .build-temp/
fi

# Run the build
echo "Building Next.js app..."
npm run build

BUILD_STATUS=$?

# Restore next.config.mjs
echo "Restoring next.config.mjs..."
mv .build-temp/next.config.mjs.backup next.config.mjs

# Restore directories
if [ -d ".build-temp/studio" ]; then
  echo "Restoring studio folder..."
  mv .build-temp/studio app/
fi

if [ -d ".build-temp/api" ]; then
  echo "Restoring api folder..."
  mv .build-temp/api app/
fi

# Cleanup
rmdir .build-temp 2>/dev/null

if [ $BUILD_STATUS -eq 0 ]; then
  echo "✓ Build completed successfully!"
  echo "✓ All pages have been pre-rendered as static HTML"
  echo ""
  echo "Your static site is ready in the 'out' directory"
else
  echo "✗ Build failed"
  exit 1
fi
