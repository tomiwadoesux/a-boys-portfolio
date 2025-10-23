"use client";

import PageConfig from "../components/PageConfig";
import LabCards from "../components/LabCards";

// Note: metadata export doesn't work in client components
// Consider moving this to a server component wrapper if needed

export default function page() {
  const cards = [
    {
      id: 1,
      height: '320px',
      title: 'Large Project',
      description: 'This is a large featured project',
    },
    {
      id: 2,
      height: '220px',
      title: 'Quick Design',
    },
    {
      id: 3,
      height: '280px',
      title: 'Medium Project',
      description: 'A medium-sized showcase',
    },
    {
      id: 4,
      height: '400px',
      title: 'Tall Feature',
      description: 'This card is extra tall for detailed content',
    },
    {
      id: 5,
      height: '250px',
      title: 'Wide Banner',
    },
    {
      id: 6,
      height: '300px',
      title: 'Creative Work',
    },
    {
      id: 7,
      height: '180px',
      title: 'Mini Project',
    },
    {
      id: 8,
      height: '350px',
      title: 'Featured Work',
      description: 'Another large showcase piece',
    },
  ];

  return (
    <div>
      <PageConfig
        activePage="/lab"
        description={
          <>
            Everything you can imagine is real..{" "}
            <span className="text-[#4447A9]"> Lab :0</span>
          </>
        }
      />
      <LabCards cards={cards} />
    </div>
  );
}
