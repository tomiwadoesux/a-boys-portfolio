"use client";

import { useState } from "react";
import PlaygroundCards from "./PlaygroundCards";

export default function PlaygroundCardsExample() {
  const [cards] = useState([
    {
      id: 1,
      size: 'large',
      title: 'Large Card',
      description: 'This is a large card that spans 2 columns',
      image: null, // Add your image URL
    },
    {
      id: 2,
      size: 'small',
      title: 'Small Card',
      image: null,
    },
    {
      id: 3,
      size: 'medium',
      title: 'Medium Card',
      description: 'A medium-sized card',
      image: null,
    },
    {
      id: 4,
      size: 'tall',
      title: 'Tall Card',
      description: 'This card is extra tall',
      image: null,
    },
    {
      id: 5,
      size: 'wide',
      title: 'Wide Card',
      image: null,
    },
    {
      id: 6,
      size: 'medium',
      title: 'Another Medium',
      image: null,
    },
    {
      id: 7,
      size: 'small',
      title: 'Small Card 2',
      image: null,
    },
    {
      id: 8,
      size: 'large',
      title: 'Large Card 2',
      description: 'Another large card',
      image: null,
    },
  ]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">
          Playground Cards - Masonry Layout
        </h1>
        <PlaygroundCards cards={cards} />
      </div>
    </div>
  );
}
