import { useEffect } from 'react'
import OSUCard from './OSUCard'

import { OSUCardData, OSUMathProvider } from './OSUMathProvider'
import OSUDisk from './OSUDisk';

export default function OSUAlbum({
    scrollPosition = 0,
    loopThrough = false,
    setAllowScrollUp,
    setAllowScrollDown
}: {
    scrollPosition?: number,
    loopThrough?: boolean,
    setAllowScrollUp?: (allow: boolean) => void,
    setAllowScrollDown?: (allow: boolean) => void,
}) {

  // These values would be different depending on monitor size
  let r = 100;
  let C_x = 120;
  let C_y = 50;
  let deltaTheta = 0.2;
  let scaleFactor = 0.8;
  
  let numRenderedCards = 9;
  let numTotalCards = 20;
  let scrollSpeed = 0.0004;

  if (screen.width < 768) {
    // For mobile devices, adjust the values accordingly
    // These values are just examples, you may need to adjust them based on your design
    C_x = 70;
    C_y = 30;
    r = 30;
    deltaTheta = 0.6;
    scaleFactor = 0.3;
    numRenderedCards = 7;
    scrollSpeed = 0.005;
  }


  const cardData: OSUCardData[] = [
    {
      title: "CUHK CTF 2026 - Author",
      description: "Wrote CTF Challenges for CUHK CTF 2026",
      date: "2026-12 (Upcoming)"
    },
    {
      title: "AI Engineer at 現代小學士",
      description: "Worked on AI Primary English Exams",
      date: "2026-8"
    },
    {
      title: "AI Chatbot & CRM",
      description: "For AMA21NG and 知傳健康",
      date: "2026-8"
    },
    {
      title: "NuttyShell x PolyU CTF Champion",
      description: "Won with \"Team Meng Wei\"",
      date: "2026-3"
    },
    {
      title: "AutoBB - Automatic Blackboard Downloader",
      description: "A chrome extension with active paid users",
      date: "2026-1"
    },
    {
      title: "CUHK CTF 2025 1st Runner Up",
      description: "Won with \"hello world has been taken\"",
      date: "2025-12"
    },
    {
      title: "FeastAR - AR Food Ordering System",
      description: "A mobile AR food ordering system for restaurants",
      date: "2025-5"
    },
    {
      title: "Jokangel Crystals - E-commerce Website",
      description: "Built an e-commerce website for Jokangel Crystals",
      date: "2025-2"
    },
    
  ];

  const numSideRenderedCards = Math.floor(numRenderedCards / 2);
  
  const currentWorldTheta = 2 * Math.PI + scrollPosition * scrollSpeed - deltaTheta * (numSideRenderedCards);

  


  // Loop back
  const sidePos = Math.PI - deltaTheta * numSideRenderedCards;
  
  const selectedIndex = Math.floor((currentWorldTheta - sidePos) / deltaTheta) - (numRenderedCards == 9 ? numRenderedCards : 0) - numSideRenderedCards - 1;

  useEffect(() => {
    console.log("selectedIndex", selectedIndex)
    if (setAllowScrollUp) {
      setAllowScrollUp(selectedIndex < 0);
    }
    if (setAllowScrollDown) {
      setAllowScrollDown(selectedIndex > numTotalCards);
    }
  }, [selectedIndex]);

  return (
    <div className="relative w-full h-full overflow-hidden">

        <OSUMathProvider.Provider value={{ r, C_x, C_y, scaleFactor, numRenderedCards, cards: cardData, scrollSpeed, currentWorldTheta, selectedIndex }}>
        {/* 9 cards on screen*/}
          <div className="absolute w-full h-full">
            {
              [...Array(numRenderedCards)].map((_, index) => {
                const theta = Math.PI - deltaTheta * (Math.floor(numRenderedCards / 2) - index);
                
                let currIndex = index;

                const sideBorder = Math.PI - deltaTheta * Math.floor(numRenderedCards / 2);

                currIndex = Math.floor((currentWorldTheta - theta - sideBorder) / (deltaTheta * numRenderedCards)) * numRenderedCards + index;

                // Enable Loop through?
                if (loopThrough) {
                  currIndex = ((currIndex % numTotalCards) + numTotalCards) % numTotalCards;
                }

                const card = cardData[currIndex];
                return card && (
                  <OSUCard
                    key={index}
                    theta={theta}
                    cardIndex={currIndex + 1}
                    deltaTheta={deltaTheta}
                    card={card} />
                );
              })
            }
          </div>
          <OSUDisk />
        </OSUMathProvider.Provider>
    </div>
  )
}
