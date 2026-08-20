import React from 'react'
import { OSUMathProvider } from './OSUMathProvider';

export default function OSUDisk() {

  const { selectedIndex, cards } = React.useContext(OSUMathProvider);
  return (
    <div className={`absolute rounded-full border-10 border-gray-400 h-[300%] top-[210%] left-[50%] md:w-[100%] p-3 md:h-auto md:left-[100%] md:top-[50%] -translate-x-1/2 -translate-y-1/2 aspect-square bg-gradient-to-b from-gray-200 to-gray-400 shadow-lg ${(selectedIndex > 0 && cards.length >= selectedIndex) ? 'opacity-100' : 'opacity-0'} transition-opacity duration-[300ms] ease-in-out`}>
        <div className={`w-[100%] h-[100%] p-3 border-10 border-gray-400 rounded-full bg-gradient-to-b`}>
            <div className={`w-[100%] h-[100%] p-3 border-10 border-gray-400 rounded-full bg-gradient-to-b`}>
            <div className={`w-[100%] h-[100%] p-3 border-10 border-gray-400 rounded-full bg-gradient-to-b`}>

            <div className={`w-[100%] h-[100%] p-3 border-10 border-gray-400 rounded-full bg-gradient-to-b`}>

            </div>
            </div>

            </div>

        </div>
    </div>
  )
}
