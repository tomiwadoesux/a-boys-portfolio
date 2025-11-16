'use client'

import { useRouter } from 'next/navigation'

export default function ProjectNavigation({ prevIndex, nextIndex }) {
  const router = useRouter()

  const handlePrevious = () => {
    if (prevIndex) {
      router.push(`/project/${prevIndex}`)
    }
  }

  const handleNext = () => {
    if (nextIndex) {
      router.push(`/project/${nextIndex}`)
    }
  }

  return (
    <div className="flex pt-4 flex-row pb-8">
      <button
        onClick={handlePrevious}
        disabled={!prevIndex}
        className="flex flex-1 flex-row gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75 transition-opacity"
      >
        <svg
          width="22"
          height="12"
          viewBox="0 0 22 12"
          fill="none"
          className="self-center"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.75 6.27344C21.1642 6.27344 21.5 5.93765 21.5 5.52344C21.5 5.10922 21.1642 4.77344 20.75 4.77344V5.52344V6.27344ZM0.21967 4.99311C-0.0732233 5.286 -0.0732233 5.76087 0.21967 6.05377L4.99264 10.8267C5.28553 11.1196 5.76041 11.1196 6.0533 10.8267C6.34619 10.5338 6.34619 10.059 6.0533 9.76608L1.81066 5.52344L6.0533 1.2808C6.34619 0.987904 6.34619 0.51303 6.0533 0.220137C5.76041 -0.0727566 5.28553 -0.0727566 4.99264 0.220137L0.21967 4.99311ZM20.75 5.52344V4.77344L0.75 4.77344V5.52344V6.27344L20.75 6.27344V5.52344Z"
            fill="black"
          />
        </svg>

        <h4 className={`flex text-xs ${!prevIndex ? 'opacity-50' : ''}`}>Previous Project</h4>
      </button>

      <button
        onClick={handleNext}
        disabled={!nextIndex}
        className="flex justify-end flex-1 flex-row gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-75 transition-opacity"
      >
        <h4 className={`flex text-xs ${!nextIndex ? 'opacity-50' : ''}`}>Next Project</h4>
        <svg
          width="22"
          height="12"
          viewBox="0 0 22 12"
          className="self-center"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.75 4.77344C0.335787 4.77344 7.24234e-08 5.10922 0 5.52344C-7.24234e-08 5.93765 0.335786 6.27344 0.75 6.27344L0.75 5.52344L0.75 4.77344ZM21.2803 6.05377C21.5732 5.76088 21.5732 5.286 21.2803 4.99311L16.5074 0.220139C16.2145 -0.0727539 15.7396 -0.072754 15.4467 0.220139C15.1538 0.513032 15.1538 0.987906 15.4467 1.2808L19.6893 5.52344L15.4467 9.76608C15.1538 10.059 15.1538 10.5338 15.4467 10.8267C15.7396 11.1196 16.2145 11.1196 16.5074 10.8267L21.2803 6.05377ZM0.75 5.52344L0.75 6.27344L20.75 6.27344L20.75 5.52344L20.75 4.77344L0.75 4.77344L0.75 5.52344Z"
            fill="black"
          />
        </svg>
      </button>
    </div>
  )
}
