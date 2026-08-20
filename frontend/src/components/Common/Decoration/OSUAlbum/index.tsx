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
    scrollSpeed = 0.003;
  }


  const cardData: OSUCardData[] = [
    {
      title: "CUHK CTF 2026 - Author",
      description: "Wrote CTF Challenges for CUHK CTF 2026",
      date: "2026-12 (Upcoming)",
      content: "I am now writing CTF challenges for CUHK CTF 2026!!! I will be writing challenges for Web, Rev, OSINT, and Misc for now. Stay tuned for more updates on this!",
      href: "https://www.instagram.com/catasploit/",
      hrefText: "CUHK CTF Team Instagram"
    },
    {
      title: "AI Engineer at 現代小學士",
      description: "Worked on AI Primary English Exams",
      date: "2026-8",
      content: "I worked for a summer internship at Modern Bachelor Education, where I developed an AI system for parents to generate primary school English exams",
      href: "https://easypaper.ai",
      hrefText: "EasyPaper Website"
    },
    {
      title: "AI Chatbot & CRM",
      description: "For AMA21NG and 知傳健康",
      date: "2026-8",
      content: "I'm currently working on a custom-built CRM System for WellWiseSolutions. The system also integrates an AI Chatbot with WhatsApp Business API to answer customer inquiries, making use of FastMCP, MongoDB, FastAPI and Flask. (Yes, there are two backend frameworks, one is for the CRM API and one is for the LLM Chatbot).",
      href: "https://wellwisesolutions.health/",
      hrefText: "WellWiseSolutions"
    },
    {
      title: "NuttyShell x PolyU CTF Champion",
      description: "Won with \"Team Meng Wei\"",
      date: "2026-3",
      content: "Mainly done a lot of OSINT challenges here, since my teammate was better at binary than I am this time. (I usually do binary)",
      href: "https://www.cse.cuhk.edu.hk/news/achievements/cybersecurity-competitions-2025-2026/"
    },
    {
      title: "AutoBB - Automatic Blackboard Downloader",
      description: "A chrome extension with active paid users",
      date: "2026-1",
      content: "This was my first project trying to monetize B2C products. It was not designed to make a lot of money, but to learn how payment systems work. I made use of Stripe to set up the payment system, and used free tier cloudflare.",
      href: "https://autobb.kalalib.com",
      hrefText: "Product Website"
    },
    {
      title: "CUHK CTF 2025 1st Runner Up",
      description: "Won with \"hello world has been taken\"",
      date: "2025-12",
      content: "This time I worked on binary and rev challenges, since I'm the only one who could do binary.",
      images: [
        "./assets/images/cuhkctf2025_groupphoto.png",
        "./assets/images/cuhkctf2025.png"
      ],
      href: "https://www.cse.cuhk.edu.hk/news/achievements/cybersecurity-competitions-2025-2026/"
    },
    {
      title: "FeastAR - AR Food Ordering System",
      description: "A mobile AR food ordering system for restaurants",
      date: "2025-5",
      href: "https://feastar.kalalib.com",
      hrefText: "FeastAR Demo Website",
      content: "FeastAR is a mobile AR food ordering system for restaurants. We are currently developing this for a local restaurant for pilot testing.",
    },
    {
      title: "Jokangel Crystals - E-commerce Website",
      description: "Built an e-commerce website for Jokangel Crystals",
      date: "2025-2",
      content: "Helped a local merchant build an e-commerce and portfolio website for their crystal business. The website is built with Wix Studio.",
      images: [
        "./assets/images/jokangel_crystals.png"
      ],
      href: "https://lokapakki.wixstudio.com/jokangel-shop"
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
