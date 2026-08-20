import React from 'react'
import TypingAnimation from './TypingAnimation'

export default function CLISelection({
  option,
  setOption,
  hoverOption,
  setHoverOption,
  choices,
  descriptions,
  delay,
  speed,
  isVisibleOverride = undefined
}: {
  option: number,
  setOption: React.Dispatch<React.SetStateAction<number>>,
  hoverOption: number,
  setHoverOption: React.Dispatch<React.SetStateAction<number>>,
  choices: string[],
  descriptions: string[],
  delay: number,
  speed: number,
  isVisibleOverride?: boolean | undefined
}) {
  
  return (
    <div className="flex flex-col gap-2 text-lg font-light min-h-xl">
      {
        choices.map((choice, index) => (
          <div key={index} onMouseEnter={() => setHoverOption(index)} onMouseLeave={() => setHoverOption(-1)} onClick={() => setOption(x => x == index ? -1 : index )} >
            <div>
              <span className={`${option === index ? 'text-primary' : 'text-secondary'} font-mono ${(hoverOption === index || option === index) ? 'opacity-100' : 'opacity-0'}`}><TypingAnimation text=">" delayMs={delay} speedMs={speed} isVisibleOverride={isVisibleOverride}/></span>
              &nbsp;
              <TypingAnimation text={choice} delayMs={delay} speedMs={speed} isVisibleOverride={isVisibleOverride}/>
            </div>
            <div className={`text-sm font-mono ml-[1em] text-gray-500 ${(hoverOption === index || option === index) ? 'opacity-100' : 'opacity-30'}`}>
              <TypingAnimation text={descriptions[index]} delayMs={delay + 100} speedMs={speed} isVisibleOverride={isVisibleOverride}/>
            </div>
          </div>
        ))
      }
    </div>
  )
}
