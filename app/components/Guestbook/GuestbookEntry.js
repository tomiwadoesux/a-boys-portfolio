"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";

// Helper function to get or create a unique device ID
const getOrCreateDeviceId = () => {
  const deviceIdKey = 'guestbook_device_id';
  let deviceId = localStorage.getItem(deviceIdKey);
  if (!deviceId) {
    deviceId = 'device_' + Math.random().toString(36).substring(2, 11);
    localStorage.setItem(deviceIdKey, deviceId);
  }
  return deviceId;
};

export default function GuestbookEntry({
  entryId,
  name,
  message,
  city,
  country,
  region,
  link = null,
  date,
  stampImage = null,
  stampGenerating = false,
  reactions = 0,
  isFirstFromCountry = false,
}) {
  const [isStamping, setIsStamping] = useState(false);
  const [dominantColor, setDominantColor] = useState(null);

  const displayDate =
    date instanceof Date
      ? date.toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        })
      : new Date(date).toLocaleDateString(undefined, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

  // Show region and country, or just country
  const location = region && region !== "Unknown" ? `${region}, ${country}` : country;

  // Generate random hue for each entry (but keep it consistent per entry)
  const hue = useMemo(() => {
    // Use entryId to generate consistent hue for each entry
    const hash = entryId?.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) || 0;
    return 243; // Using #4447a9 hue
  }, [entryId]);

  // Random position for the stamp image
  const imagePosition = useMemo(() => {
    if (!entryId) return { top: '15%', left: '10%', rotate: 5 };
    const hash = entryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Random position anywhere on the card
    const positions = [
      { top: '12%', left: '8%', rotate: -8 },
      { top: '15%', right: '10%', rotate: 12 },
      { top: '45%', left: '5%', rotate: -15 },
      { top: '50%', right: '8%', rotate: 10 },
      { bottom: '40%', left: '12%', rotate: -12 },
      { bottom: '35%', right: '15%', rotate: 8 },
      { top: '25%', left: '50%', rotate: -5 },
      { top: '60%', left: '55%', rotate: 15 },
    ];
    return positions[hash % positions.length];
  }, [entryId]);

  const randomRotate = useMemo(() => {
    // Generate deterministic rotation based on entryId to avoid hydration mismatch
    if (!entryId) return 0;
    const hash = entryId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return (hash % 30) / 10 - 1.5; // Returns value between -1.5 and 1.5
  }, [entryId]);

  // Extract dominant color from image
  const extractDominantColor = (imgElement) => {
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = imgElement.width;
      canvas.height = imgElement.height;

      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      const colorCounts = {};

      // Sample every 5th pixel for performance
      for (let i = 0; i < data.length; i += 20) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];

        // Skip transparent and very light/dark pixels
        if (a < 125 || (r > 240 && g > 240 && b > 240) || (r < 15 && g < 15 && b < 15)) continue;

        // Round to reduce similar colors
        const roundedR = Math.round(r / 10) * 10;
        const roundedG = Math.round(g / 10) * 10;
        const roundedB = Math.round(b / 10) * 10;

        const colorKey = `${roundedR},${roundedG},${roundedB}`;
        colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
      }

      // Find most common color
      let maxCount = 0;
      let dominantColor = null;

      for (const [color, count] of Object.entries(colorCounts)) {
        if (count > maxCount) {
          maxCount = count;
          dominantColor = color;
        }
      }

      if (dominantColor) {
        const [r, g, b] = dominantColor.split(',').map(Number);

        // Convert to HSL for better color manipulation
        const hsl = rgbToHsl(r, g, b);

        // Lighten the color for background (increase lightness)
        const lightHsl = `hsl(${hsl.h}, ${Math.min(hsl.s, 60)}%, ${Math.min(hsl.l + 35, 95)}%)`;

        setDominantColor(lightHsl);
      }
    } catch (error) {
      console.error('Error extracting color:', error);
    }
  };

  // Convert RGB to HSL
  const rgbToHsl = (r, g, b) => {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  return (
    <>
      <div
        className="guestbook-stamp entry-stamp"
        style={{
          '--hue': `${hue}`,
          '--primary-stamp-color': '#4447a9',
          '--light-stamp-bg': dominantColor || 'hsl(0, 0%, 100%)',
          '--text-bg-overlay': dominantColor ? `${dominantColor.replace(')', ', 0.7)')}` : 'hsla(0, 0%, 100%, 0.7)',
          '--dark-text-fixed': `hsl(${hue}, 60%, 20%)`,
          '--mid-grey-fixed': `hsl(${hue}, 15%, 45%)`,
          '--gold-accent': `hsl(45, 80%, 60%)`,
          '--postmark-color-fixed': `hsla(${hue}, 40%, 30%, 0.8)`,
          '--border-accent': '#4447a9',
          '--rotate': `${randomRotate.toFixed(2)}deg`,
        }}
      >

        <div className="stamp-frame">
          <div className="stamp-bg-solid"></div>
        </div>

        <div className="content-overlay">
          <div className="corner top-left"></div>
          <div className="corner top-right"></div>
          <div className="corner bottom-left"></div>
          <div className="corner bottom-right"></div>
        </div>

        {/* Generated stamp image - smaller and randomly positioned */}
        {stampGenerating && !stampImage ? (
          <div
            className="stamp-image-small generating"
            style={{
              top: imagePosition.top,
              left: imagePosition.left,
              right: imagePosition.right,
              bottom: imagePosition.bottom,
              transform: `rotate(${imagePosition.rotate}deg)`
            }}
          >
            <div className="spinner"></div>
          </div>
        ) : stampImage?.asset ? (
          <div
            className={`stamp-image-small ${isStamping ? 'animate-stamp' : ''}`}
            style={{
              top: imagePosition.top,
              left: imagePosition.left,
              right: imagePosition.right,
              bottom: imagePosition.bottom,
              transform: `rotate(${imagePosition.rotate}deg)`
            }}
          >
            <Image
              src={stampImage.asset.url}
              alt={`Stamp from ${location}`}
              width={150}
              height={150}
              loading="lazy"
              className="stamp-img"
              crossOrigin="anonymous"
              onLoad={(e) => {
                setIsStamping(true);
                setTimeout(() => setIsStamping(false), 600);

                // Extract dominant color from the image
                const img = e.target;
                if (img.complete) {
                  extractDominantColor(img);
                }
              }}
            />
          </div>
        ) : null}

        <div className="stamp-location-text">
          <span className="country-label">VISIT FROM</span>
          <span className="country">{country}</span>
          <div className="country-underline"></div>
        </div>

        <div className="guestbook-content">
          <div className="header-row">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="entry-name entry-link"
              >
                <strong>{name}</strong>
              </a>
            ) : (
              <strong className="entry-name">{name}</strong>
            )}

            {displayDate && (
              <time className="entry-date" dateTime={date instanceof Date ? date.toISOString() : date}>
                {displayDate}
              </time>
            )}
          </div>
          <div className="message-container">
            <p className="entry-message">{message}</p>
          </div>
        </div>

        <div className="stamp-decorative-line left"></div>
        <div className="stamp-decorative-line right"></div>
      </div>

      <style jsx>{`
        .guestbook-stamp.entry-stamp {
          --stamp-width: 350px;
          --perforation-size: 12px;
          --inner-padding: 16px;
          position: relative;
          width: var(--stamp-width);
          aspect-ratio: 4 / 5;
          background-color: var(--light-stamp-bg);
          padding: var(--perforation-size);
          box-sizing: border-box;
          overflow: hidden;
          margin: 1.5rem;
          display: inline-block;
          box-shadow:
            2px 3px 12px rgba(0, 0, 0, 0.15),
            0 0 1px rgba(0, 0, 0, 0.1),
            inset 0 0 20px rgba(255, 255, 255, 0.5);
          transform: rotate(var(--rotate));
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            background-color 0.6s ease;
          border-radius: 2px;
        }

       

        .first-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: linear-gradient(45deg, #4447A9 0%, #000 100%);
          color: white;
          font-size: 0.65rem;
          font-weight: bold;
          padding: 4px 8px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 4px;
          z-index: 5;
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .badge-icon {
          width: 10px;
          height: 10px;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }

        .stamp-frame {
          position: absolute;
          top: var(--perforation-size);
          left: var(--perforation-size);
          right: var(--perforation-size);
          bottom: var(--perforation-size);
          overflow: hidden;
          border-radius: 2px;
          z-index: 1;
          box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
        }

        .stamp-bg-solid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            135deg,
            hsla(var(--hue), 85%, 97%, 0.9),
            hsla(var(--hue), 85%, 90%, 0.7)
          );
          opacity: 0.3;
        }

        .content-overlay {
          position: absolute;
          top: calc(var(--perforation-size) + 4px);
          left: calc(var(--perforation-size) + 4px);
          right: calc(var(--perforation-size) + 4px);
          bottom: calc(var(--perforation-size) + 4px);
          background-color: var(--text-bg-overlay);
          z-index: 2;
          border-radius: 3px;
          box-shadow:
            0 0 15px rgba(255, 255, 255, 0.8),
            inset 0 0 2px rgba(0, 0, 0, 0.1);
        }

        .corner {
          position: absolute;
          width: 12px;
          height: 12px;
          border-style: solid;
          border-color: var(--primary-stamp-color);
          opacity: 0.7;
        }

        .top-left {
          top: 4px;
          left: 4px;
          border-width: 2px 0 0 2px;
        }

        .top-right {
          top: 4px;
          right: 4px;
          border-width: 2px 2px 0 0;
        }

        .bottom-left {
          bottom: 4px;
          left: 4px;
          border-width: 0 0 2px 2px;
        }

        .bottom-right {
          bottom: 4px;
          right: 4px;
          border-width: 0 2px 2px 0;
        }

        .stamp-image-small {
          position: absolute;
          width: 90px;
          height: 90px;
          z-index: 5;
          border-radius: 6px;
          overflow: hidden;
          box-shadow:
            0 3px 10px rgba(0, 0, 0, 0.25),
            0 1px 3px rgba(0, 0, 0, 0.15),
            inset 0 0 0 3px rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.9);
          transition: transform 0.3s ease, opacity 0.3s ease;
          opacity: 0.85;
        }

        .stamp-image-small:hover {
          transform: scale(1.15) !important;
          opacity: 1;
          box-shadow:
            0 5px 15px rgba(0, 0, 0, 0.3),
            0 2px 5px rgba(0, 0, 0, 0.2),
            inset 0 0 0 3px rgba(255, 255, 255, 0.9);
        }

        .stamp-image-small.generating {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.2) 100%);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid var(--primary-stamp-color);
          border-top-color: transparent;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .stamp-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          opacity: 1;
        }

        @keyframes stamp {
          0% {
            transform: scale(0.5) rotate(-10deg);
            opacity: 0;
          }
          50% {
            transform: scale(1.15) rotate(5deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }

        .animate-stamp {
          animation: stamp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        .stamp-location-text {
          bottom: calc(var(--perforation-size) + 8px);
          left: var(--perforation-size);
          right: var(--perforation-size);
          text-align: center;
          z-index: 3;
          position: absolute;
          padding: 0 12px;
        }

        .country-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 400;
          letter-spacing: 1px;
          color: var(--mid-grey-fixed);
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .country {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--primary-stamp-color);
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 0 1px rgba(255, 255, 255, 0.8);
          line-height: 1.2;
        }

        .country-underline {
          margin: 4px auto 0;
          width: 50%;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--primary-stamp-color),
            var(--gold-accent),
            var(--primary-stamp-color),
            transparent
          );
        }

        .guestbook-content {
          top: calc(var(--perforation-size) + var(--inner-padding));
          left: calc(var(--perforation-size) + var(--inner-padding));
          right: calc(var(--perforation-size) + var(--inner-padding));
          height: calc(
            100% - 2 * var(--perforation-size) - 2 * var(--inner-padding) - 45px
          );
          position: absolute;
          z-index: 3;
          display: flex;
          flex-direction: column;
        }

        .header-row {
          display: flex;
          flex-direction: column;
          margin-bottom: 8px;
          position: relative;
        }

        .entry-name {
          display: block;
          font-size: 1.25rem;
          font-weight: 700;
          color: var(--dark-text-fixed);
          line-height: 1.2;
          width: fit-content;
          max-width: 100%;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
        }

        .entry-link {
          cursor: pointer;
          text-decoration: none;
          background-image: linear-gradient(
            90deg,
            var(--dark-text-fixed) 60%,
            transparent 0
          );
          background-size: 6px 2px;
          background-repeat: repeat-x;
          background-position: left bottom 2px;
          padding-bottom: 2px;
          transition: all 0.2s ease;
        }

        .entry-link:hover {
          color: var(--primary-stamp-color);
          background-image: linear-gradient(
            90deg,
            var(--primary-stamp-color) 60%,
            transparent 0
          );
        }

        .entry-link strong {
          font-weight: 700;
          color: inherit;
        }

        .entry-date {
          display: block;
          font-size: 0.9rem;
          font-weight: bold;
          color: var(--mid-grey-fixed);
          font-style: italic;
          margin-top: 2px;
        }

        .message-container {
          background-color: rgba(255, 255, 255, 0.4);
          border-radius: 3px;
          padding: 10px 12px;
          margin-top: 4px;
          flex-grow: 1;
          border: 1px solid rgba(0, 0, 0, 0.05);
          box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.7);
          position: relative;
          overflow: hidden;
        }

        .message-container::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(
            90deg,
            transparent,
            hsla(var(--hue), 70%, 80%, 0.3),
            transparent
          );
        }

        .entry-message {
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--dark-text-fixed);
          font-weight: 400;
          margin: 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 10;
          -webkit-box-orient: vertical;
          overflow-wrap: break-word;
          word-wrap: break-word;
        }

        .stamp-value {
          position: absolute;
          top: calc(var(--perforation-size) + 10px);
          left: calc(var(--perforation-size) + 12px);
          font-size: 1.2rem;
          color: var(--gold-accent);
          z-index: 3;
          text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);
          font-weight: bold;
        }

        .stamp-decorative-line {
          position: absolute;
          height: 85%;
          width: 2px;
          top: 50%;
          transform: translateY(-50%);
          background: linear-gradient(
            to bottom,
            transparent,
            var(--border-accent),
            var(--gold-accent),
            var(--border-accent),
            transparent
          );
          opacity: 0.3;
          z-index: 3;
        }

        .stamp-decorative-line.left {
          left: calc(var(--perforation-size) + 4px);
        }

        .stamp-decorative-line.right {
          right: calc(var(--perforation-size) + 4px);
        }

        @media (max-width: 1024px) {
          .guestbook-stamp.entry-stamp {
            --stamp-width: 280px;
            --perforation-size: 10px;
            --inner-padding: 12px;
            margin: 1rem;
          }

          .entry-name {
            font-size: 1rem;
          }

          .entry-message {
            font-size: 0.85rem;
            -webkit-line-clamp: 7;
          }

          .country {
            font-size: 0.85rem;
          }

          .stamp-image-small {
            width: 70px;
            height: 70px;
          }
        }

        @media (max-width: 640px) {
          .guestbook-stamp.entry-stamp {
            --stamp-width: min(calc(50vw - 12px), 350px);
            --perforation-size: 8px;
            --inner-padding: 10px;
            margin: 0.5rem;
            aspect-ratio: 4 / 5;
          }

          .entry-name {
            font-size: 0.95rem;
          }

          .country {
            font-size: 0.8rem;
          }

          .country-label {
            font-size: 0.55rem;
          }

          .entry-message {
            font-size: 0.8rem;
            -webkit-line-clamp: 7;
          }

          .stamp-image-small {
            width: 70px;
            height: 70px;
          }

          .first-badge {
            font-size: 0.6rem;
            padding: 4px 7px;
          }

          .badge-icon {
            width: 9px;
            height: 9px;
          }
        }

        @media (max-width: 480px) {
          .guestbook-stamp.entry-stamp {
            --stamp-width: 280px;
            --perforation-size: 7px;
            --inner-padding: 9px;
            margin: 0.6rem;
            aspect-ratio: 4 / 5;
          }

          .entry-name {
            font-size: 0.9rem;
          }

          .country {
            font-size: 0.75rem;
          }

          .country-label {
            font-size: 0.5rem;
          }

          .entry-message {
            font-size: 0.75rem;
            -webkit-line-clamp: 6;
          }

          .stamp-image-small {
            width: 60px;
            height: 60px;
          }

          .first-badge {
            font-size: 0.55rem;
            padding: 3px 6px;
          }

          .badge-icon {
            width: 8px;
            height: 8px;
          }
        }
      `}</style>
    </>
  );
}
