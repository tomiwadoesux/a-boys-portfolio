"use client";

import { useState } from "react";

function IframeCard({ src, title, subtitle }) {
  const [isScrollable, setIsScrollable] = useState(false);

  return (
    <figure className="flex flex-col">
      <div
        className="cursor-pointer group"
        onMouseEnter={() => setIsScrollable(true)}
        onMouseLeave={() => setIsScrollable(false)}
      >
        {/* Iframe Container */}
        <div className="bg-[#E5E5E5] border border-black/15 rounded-t-xl aspect-[16/9] overflow-auto relative">
          <div className="w-full h-full overflow-auto">
            <iframe
              src={src}
              className={`w-[150%] h-[150%] border-none origin-top-left ${isScrollable ? 'pointer-events-auto' : 'pointer-events-none'}`}
              title={title}
              style={{
                transform: "scale(0.67)",
              }}
            />
          </div>
        </div>

        {/* Card Footer */}
        <div className="flex border border-black/15 border-t-0 py-2 bg-[#F7F7F7] px-3 justify-between items-center rounded-b-xl">
          <div className="flex items-center gap-2">
            <h4 className="text-xs underline underline-offset-2">{title}</h4>
            <h4 className="text-[11px] opacity-50">| {subtitle}</h4>
          </div>
          <h4 className="text-[11px]">Live Preview</h4>
        </div>
      </div>
    </figure>
  );
}

export default function Test() {
  const sites = [
    {
      id: 1,
      src: "https://ayotomcs.me",
      title: "ayotomcs.me",
      subtitle: "Portfolio Website"
    },
    {
      id: 2,
      src: "https://v123.ayotomcs.me/love",
      title: "v123.ayotomcs.me",
      subtitle: "Love Page"
    }
  ];

  return (
    <section className="pt-16">
      {/* Mobile: Horizontal Scroll */}
      <div className="md:hidden px-7 overflow-x-auto scrollbar-hide">
        <div className="flex gap-4 pb-4">
          {sites.map((site) => (
            <div key={site.id} className="min-w-[280px] flex-shrink-0">
              <IframeCard
                src={site.src}
                title={site.title}
                subtitle={site.subtitle}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: 2-Column Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-8 md:gap-12 px-7 md:px-20 lg:px-56">
        {sites.map((site) => (
          <IframeCard
            key={site.id}
            src={site.src}
            title={site.title}
            subtitle={site.subtitle}
          />
        ))}
      </div>
    </section>
  );
}
