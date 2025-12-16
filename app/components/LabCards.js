"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function LabCards({ cards = [] }) {
  const containerRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const container = containerRef.current;
    if (!container) return;

    const layoutMasonry = () => {
      const items = Array.from(container.children);
      const gap = 16;
      const containerWidth = container.offsetWidth;

      // Determine number of columns based on screen width
      let columnCount = 3;
      if (window.innerWidth <= 640) {
        columnCount = 1;
      } else if (window.innerWidth <= 1024) {
        columnCount = 2;
      }

      const columnWidth = (containerWidth - gap * (columnCount - 1)) / columnCount;
      const columnHeights = new Array(columnCount).fill(0);

      items.forEach((item, index) => {
        // Find the shortest column
        const shortestColumnIndex = columnHeights.indexOf(Math.min(...columnHeights));

        // Calculate position
        const x = shortestColumnIndex * (columnWidth + gap);
        const y = columnHeights[shortestColumnIndex];

        // Apply position
        item.style.position = 'absolute';
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        item.style.width = `${columnWidth}px`;

        // Update column height
        columnHeights[shortestColumnIndex] += item.offsetHeight + gap;
      });

      // Set container height
      container.style.height = `${Math.max(...columnHeights)}px`;
    };

    // Initial layout
    layoutMasonry();

    // Re-layout on window resize
    const handleResize = () => {
      layoutMasonry();
    };

    window.addEventListener('resize', handleResize);

    // Use ResizeObserver to handle dynamic content changes
    const resizeObserver = new ResizeObserver(() => {
      layoutMasonry();
    });

    resizeObserver.observe(container);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
    };
  }, [isClient, cards]);

  return (
    <div className="lab-container w-full px-20 lg:px-56 p-4">
    <div ref={containerRef} className="lab-grid">
        {cards.map((card, idx) => {
          const CardContent = () => (
            <div className="flex flex-col h-full bg-white">
              {card.image ? (
                <div className="relative w-full aspect-[16/10] bg-[#E5E5E5]">
                  <Image
                    src={card.image}
                    alt={card.title || 'Card image'}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="relative w-full aspect-[16/10] bg-[#E5E5E5] flex items-center justify-center">
                  <span className="text-gray-400 text-xs">No Image</span>
                </div>
              )}
              
              {/* Card Footer matching ProjectCard style */}
              <div className="flex-shrink-0 border-t border-black/15 bg-[#F7F7F7] px-3 py-2">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xs underline underline-offset-2 font-bold">{card.title}</h3>
                    {card.link && (
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <path d="M11 1V11M11 1H1M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  {card.description && (
                   <div className="flex items-start gap-1">
                      <p className="text-sm opacity-80">{card.description}</p>
                   </div>
                  )}
                </div>
              </div>
            </div>
          );

          if (card.link) {
            return (
              <a
                key={card.id || idx}
                href={card.link}
                target="_blank"
                rel="noopener noreferrer"
                className="lab-card block rounded-xl overflow-hidden relative group border border-black/15 hover:shadow-md transition-all duration-300"
              >
                <CardContent />
              </a>
            );
          }

          return (
            <div
              key={card.id || idx}
              className="lab-card rounded-xl overflow-hidden relative group border border-black/15"
            >
              <CardContent />
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .lab-grid {
          position: relative;
          width: 100%;
        }

        .lab-card {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
