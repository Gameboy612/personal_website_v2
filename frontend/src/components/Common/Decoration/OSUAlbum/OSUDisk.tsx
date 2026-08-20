import React from 'react'
import { OSUMathProvider } from './OSUMathProvider';
import ImageGallery from '../ImageGallery';

export default function OSUDisk() {

  const { selectedIndex, cards } = React.useContext(OSUMathProvider);

  const card = cards[selectedIndex - 1];

  return (
    <div className={`absolute rounded-full border-10 border-gray-400 h-[300%] top-[195%] left-[50%] md:w-[100%] p-3 md:h-auto md:left-[100%] md:top-[50%] -translate-x-1/2 -translate-y-1/2 aspect-square bg-gradient-to-b from-gray-200 to-gray-400 shadow-lg ${(selectedIndex > 0 && cards.length >= selectedIndex) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[300ms] ease-in-out`}>
        <div className={`absolute w-[100%] h-[100%] p-3 border-10 border-gray-400 rounded-full bg-gradient-to-b`}>
            <div className={`w-[100%] h-[100%] p-3 border-10 border-gray-400 rounded-full bg-gradient-to-b`}>

              <div className={`absolute top-0 left-[50%] -translate-x-1/2 w-[100vw] h-[50vh] md:top-[50%] md:w-[44%] md:left-[3%] md:h-[80vh] md:translate-x-0 md:-translate-y-1/2 md:p-15`}>
              <div className="flex flex-col justify-center h-full">
                 <div className={`text-md md:text-2xl font-bold font-mono md:mb-4 text-primary`}>
                  {card?.title}
                </div>

                <div className="text-sm mb-2 md:text-lg md:mb-4 text-gray-800">
                  {card?.content}
                </div>

                {
                  card?.images && card.images.length > 0 && (
                    <div className="max-h-[50%] md:max-h-[60%] w-full flex justify-center">
                      <div className="w-full h-full max-w-[70%]">
                      <ImageGallery images={card.images} />
                      </div>
                    </div>
                  )
                }

                {
                  card?.href && (
                    <div className="mt-4">
                      <a href={card.href} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        {card.hrefText || "Learn more"}
                      </a>
                    </div>
                  )
                }
              </div>
                
                
              </div>
            </div>

        </div>
    </div>
  )
}
