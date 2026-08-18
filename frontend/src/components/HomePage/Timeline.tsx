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
  href?: string;
  background_url: string[];
}

const achievements: Achievement[] = [
  {
    title: "WellwiseSolutions",
    role: "Full Stack Developer (CRM and AI Integration)",
    description:
      "- Built a CRM with **React Native** and **Flask** for more than 200 internal members.\n- Designed tree-based access permissions for multi-level marketing, storing over 2,000 appointments and client records in **AWS S3** and **MongoDB**.\n- Implemented scheduled WhatsApp outreach for more than 1,000 prospects and an **MCP server** for saving and recalling prospect data.",
    tags: ["React Native", "Flask", "MongoDB", "AWS S3", "FastMCP"],
    timeframe: "Feb 2026 - Present",
    href: "https://wellwisesolutions.health",
    background_url: [],
  },
  {
    title: "CTFTime - 1st Place in Hong Kong",
    role: "Competitive Security Researcher",
    description:
      "Contributed to major rated events including **UTCTF** and **HKCERT**.",
    tags: ["CTF", "Cyber Security"],
    timeframe: "Mar 2026",
    background_url: [],
  },
  {
    title: "NuttyShell CTF 2026 - Champion",
    role: "Team Competitor",
    description:
      "- Achieved **1st place out of 179 teams** with 56 of 61 challenges solved.\n- Specialized in **OSINT**, miscellaneous, artificial intelligence, and web exploitation.",
    tags: ["CTF", "OSINT", "AI", "Web Exploitation"],
    timeframe: "Mar 2026",
    background_url: [],
  },
  {
    title: "KongPaper",
    role: "3-Year Internship as Full-Stack Developer",
    description:
      "- Developed a scheduled web-crawling pipeline using **Selenium** and **Milvus**, collecting 100 online news articles per week as vector embeddings.\n- Designed an LLM and RAG pipeline for DSE-style English reading papers, reaching **1,000 papers generated** by September 2025.\n- Deployed a listening-exercise pipeline that produces five minutes of audio and 10 coherent questions with **Ollama**, **CosyVoice**, and **Next.js**.",
    tags: ["FastAPI", "Next.js", "Selenium", "Milvus", "Ollama", "CosyVoice"],
    timeframe: "July 2024 - Present",
    href: "https://kongpaper.com",
    background_url: ["./assets/images/kongpaper_cover.png"],
  },
  {
    title: "CUHK CTF 2025 - 1st Runner Up",
    role: "C072 - hello world has been taken",
    description:
      "48-hour Jeopardy-style hacking competition by CUHK.\n- Awarded **1st Runner-up** in the CUHK Division and **4th place overall** out of 158 teams.\n- Specialized in web, binary, reverse, and cloud engineering.",
    tags: ["CTF", "Cyber Security", "Web", "Cloud Security", "Binary", "Reverse"],
    timeframe: "Sep 2025",
    background_url: ["./assets/images/cuhkctf2025.png"],
  },
  {
    title: "VoiceLight",
    role: "Solo Commission-Based Backend Developer",
    description:
      "- Built a **FastAPI** server with JWT and OAuth2 for more than 100 profiles, audio files, and images using **MongoDB** and **AWS S3**.\n- Deployed an audio-transformation neural network for constriction, breathiness, and nasalization using **Librosa** and **PyTorch**.",
    tags: ["FastAPI", "OAuth2", "MongoDB", "AWS S3", "Librosa", "PyTorch"],
    timeframe: "Jun 2025 - Aug 2025",
    background_url: [],
  },
  {
    title: "KALA Solutions",
    role: "Full Stack Developer",
    description:
      "- Built landing pages and backend systems for small and medium enterprises, including Jokangel Crystals, Amazing Echo Solutions, and VoiceLight.\n- Led systems development for **Devas**, a Minecraft RPG datapack, in collaboration with 3D artists and game designers.\n- Led development and marketing for **FeastAR** and **AutoBB**.",
    tags: ["Full Stack", "Web Development", "Minecraft Datapacks", "AR"],
    timeframe: "Jun 2023 - Present",
    href: "https://kalalib.com",
    background_url: [],
  },
  {
    title: "CUHK Student Helper Scheme",
    role: "Machine Learning Research Assistant",
    description:
      "- Labelled over 90 minutes of WAV data for classifying wall defects from knocking sounds.\n- Used **Librosa** and **TensorFlow** to preprocess and analyse mel-spectrograms with **89% accuracy**.",
    tags: ["Python", "Librosa", "TensorFlow", "Audio Classification"],
    timeframe: "Jan 2024 - Apr 2024",
    background_url: [],
  },
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
  return <div ref={setRef} id="timeline" className="w-full flex justify-left pb-30">
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
