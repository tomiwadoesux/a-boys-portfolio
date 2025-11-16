'use client'

import MediaBox from './MediaBox'

export default function InfoSection({ section, index }) {
  const { media, text } = section

  // Alternate layout: odd indices (0, 2, 4...) have media on left
  // even indices (1, 3, 5...) have media on right
  const isMediaOnLeft = index % 2 === 0

  return (
    <div className="pt-4">
      <svg
        className="w-full h-px"
        viewBox="0 0 100 1"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line
          x1="0"
          y1="0.5"
          x2="100"
          y2="0.5"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
      <div className={`flex pt-4 flex-col ${isMediaOnLeft ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 lg:gap-8 items-start lg:items-center`}>
        <div className="w-full lg:flex-1">
          <MediaBox media={media} />
        </div>
        <div className="w-full lg:flex-1 flex items-center">
          <p className="text-sm leading-relaxed text-gray-700">{text}</p>
        </div>
      </div>
    </div>
  )
}
