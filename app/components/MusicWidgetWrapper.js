"use client";

import dynamic from "next/dynamic";

// Lazy load MusicWidget to prevent blocking initial page load
const MusicWidget = dynamic(() => import("./MusicWidget"), {
  loading: () => <div className="h-16" />, // Placeholder while loading
  ssr: false, // Don't render on server
});

export default function MusicWidgetWrapper() {
  return <MusicWidget />;
}
