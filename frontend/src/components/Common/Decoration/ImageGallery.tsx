import { useState } from "react"

export default function ImageGallery({ images }: { images: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  if (images.length === 0) {
    return null
  }

  const showPrevious = () => {
    setCurrentIndex((index) => (index - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setCurrentIndex((index) => (index + 1) % images.length)
  }

  return (
    <div className="relative flex w-full aspect-[1.5] items-center justify-between">
      {images.length > 1 && (
        <button
          aria-label="Previous image"
          className="z-10 flex h-10 w-10 items-center justify-center text-2xl text-gray-700"
          onClick={showPrevious}
          title="Previous image"
          type="button"
        >
          &#8249;
        </button>
      )}
      <img
        alt={`Gallery item ${currentIndex + 1}`}
        className="h-full min-w-0 flex-1 rounded-md object-contain shadow-lg"
        src={images[currentIndex]}
      />
      {images.length > 1 && (
        <button
          aria-label="Next image"
          className="z-10 flex h-10 w-10 items-center justify-center text-2xl text-gray-700"
          onClick={showNext}
          title="Next image"
          type="button"
        >
          &#8250;
        </button>
      )}
    </div>
  )
}
