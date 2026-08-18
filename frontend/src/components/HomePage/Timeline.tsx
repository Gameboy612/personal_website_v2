import { useEffect, useRef, useState } from "react"
import type { RefCallback } from "react"
import Markdown from "react-markdown"
import rehypeRaw from "rehype-raw"
import ImageGallery from "../Common/ImageGallery"
import Tag from "../Common/Tag"
import { mdxComponents } from "../ui/mdxComponents"

interface Achievement {
  title: string;
  role: string;
  description: string;
  tags: string[];
  timeframe: string;
  href: string;
  background_url: string[];
}

const achievements: Achievement[] = [
  {
    title: "KongPaper",
    role: "Full Stack Developer (Part-time)",
    description: "- Reduced LLM pipeline from **15 to 3 minutes** (80% reduction) for English Reading generation through async operations.\n- Deployed **CosyVoice** and **Gemma** pipelines to synthesize listening exercises.\n- **Statistical Analysis** for user signups, service usage and user retention for Admin Panel.",
    tags: ["FastAPI", "Next.js", "TailwindCSS", "MongoDB", "MilvusDB", "RedisDB"],
    timeframe: "July 2024 - Present",
    href: "/projects/kongpaper",
    background_url: ["./assets/images/kongpaper_cover.png"]
  },
  {
    title: "CUHK CTF 2025 - 1st Runner Up",
    role: "C072 - hello world has been taken",
    description: "48-hour Jeopardy styled hacking competition by CUHK.\n- 2nd place in CUHK Division.\n- 4th/158 place overall.",
    tags: ["CTF", "Cyber Security", "Web", "Cloud Security", "Binary", "Reverse"],
    timeframe: "Oct 2025",
    href: "/projects/fastapi-fullstack",
    background_url: ["./assets/images/cuhkctf2025.png", "./assets/images/cuhkctf2025.png"]
  },
  {
    title: "Devas - Colloseum",
    role: "Minecraft Mod Developer",
    description: "Developed a Minecraft RPG PVP-based mod using *datapacks* for a custom PVP gamemode.\n- Flexible EChest-based GUI system, featuring an Excel-based Editor by Python.\n- Complete Gameplay Loop featuring CTF mechanics with global-time-based events.\n- Implementation of Custom RPG Stats including rewriting the base Health, Speed, Defense, Damage, Stamina, Mana, etc.",
    tags: ["mcfunction", "Python"],
    timeframe: "Jun 2019 - Dec 2024",
    href: "/projects/devas",
    background_url: ["https://media.istockphoto.com/id/184276818/photo/red-apple.jpg?s=612x612&w=0&k=20&c=NvO-bLsG0DJ_7Ii8SSVoKLurzjmV0Qi4eGfn6nW3l5w=" ]
  }
]

function AchievementCard({
  setRef,
  activeIndex,
  i,
  title,
  role,
  description,
  timeframe,
  href,
  tags,
  background_url
}: Achievement & { activeIndex: number, i: number, setRef: RefCallback<HTMLDivElement> }) {
  return <div ref={setRef} className="w-full flex justify-left pb-30">
    <a className="px-4 sm:px-[20%] md:px-[30%] relative w-full rounded-lg" href={href}>
      <div className="text-left">
        <div>
          <div className={`absolute top-4 w-4 h-4 rounded-full left-[20%] translate-x-[-50%] translate-y-[-50%] duration-300 transition-colors transition hidden sm:block ${activeIndex < i ? 'bg-gray-0' : 'bg-blue-500'}`} />
          {/* <img src={background_url} alt={title}
            className={`object-contain aspect-[2] w-full rounded-md mb-4 cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300`} /> */}
          <ImageGallery images={background_url} />
          <div className="ml-4">
            <p className="text-xl font-bold text-blue-600 hover:underline">{title}</p>
            <p className="text-gray-500 italic">{timeframe}</p>
            {role && <p className="text-md text-gray-600">{role}</p>}
            {
              tags && tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  { tags.map((tag, index) => <Tag key={index}>{tag}</Tag>) }
                </div>
              )
            }
            {description && (
              <div className="mt-2">
                <Markdown rehypePlugins={[rehypeRaw]} components={mdxComponents}>{description}</Markdown>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="prose lg:prose-xl">
      </div>
    </a>
  </div>
}

// function getPosition(t: number) {
//   return [-t, 1 / 10 * t * t];
// }

// function AchievementBrowser({ activeIndex, setActiveIndex, scrollPos, achievementRefs }: { activeIndex: number, setActiveIndex: (index: number) => void, scrollPos: number, achievementRefs: React.RefObject<HTMLDivElement>[] }) {




//   return <div className="sticky ml-2 top-2 w-full h-[30vh] pr-4 flex justify-center">
//     { achievements.map((ach, index) => {
//       if (index != activeIndex) return;
//       return (
//         <div className="w-full h-full flex justify-center items-center bg-gray-100" key={index}>
//           <img src={ach.background_url} alt={ach.title}
//             className={`object-contain h-full rounded-md mb-4 cursor-pointer`}
//             onClick={() => setActiveIndex(index)} />
//         </div>
//       )
//     }) }
//   </div>
// }


export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const achievementRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [scrollPos, setScrollPos] = useState(-400);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  // const [prevHeight, setPrevHeight] = useState(-1);

  const EXTENDING_HEIGHT = 400;

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const scrollTop = window.scrollY - window.innerHeight * 0.5;
        const { top } = ref.current.getBoundingClientRect();
        setScrollPos(Math.max(scrollTop - top, -2 * EXTENDING_HEIGHT) / 2);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  
  
  useEffect(() => {
    if (!ref.current) return;
    // setPrevHeight(scrollPos)

    if (scrollPos < EXTENDING_HEIGHT) {
      ref.current.style.height = `${Math.floor((scrollPos + EXTENDING_HEIGHT) / 2)}px`;
    } else {
      ref.current.style.height = `${scrollPos}px`;
    }

    const index = achievementRefs.current.findIndex((achievementRef) => {
      if (!achievementRef) return false;
      const { top } = achievementRef.getBoundingClientRect();
      return top > 0;
    });
    setActiveIndex(index === -1 ? achievements.length - 1 : index);
  }, [scrollPos]);

    return <div className="relative">
      {/* <h1>Projects</h1> */}
      <div ref={ref} className="hidden sm:block absolute top-4 border-l-2 rounded-full border opacity-[0.7] left-[20%] translate-x-[-50%]">
      </div>
      {/* <div className="relative h-[30vh]"> */}
        {/* <AchievementBrowser activeIndex={activeIndex} setActiveIndex={setActiveIndex} scrollPos={scrollPos} achievementRefs={achievementRefs}/> */}
      {/* </div> */}
      {/* <div className="relative h-[30vh]" /> */}
      {
        achievements.map((data, index) => (
          <AchievementCard
            activeIndex={activeIndex}
            i={index}
            key={index}
            setRef={(element) => {
              achievementRefs.current[index] = element
            }}
            {...data}
          />
        ))
      }
    </div>
}
