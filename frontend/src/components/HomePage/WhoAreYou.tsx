import React, { useContext, useEffect, useState } from 'react'
import TypingAnimation from '../Common/Decoration/TypingAnimation'
import CLISelection from '../Common/Decoration/CLISelection';
import CLIButton from '../Common/Decoration/CLIButton';
import { UserContext } from '@/context/UserContext';
import useIntersection from '@/hooks/useIntersection';


export default function WhoAreYou() {

  const { setUser } = useContext(UserContext); 

  const header = "Which suits you the most?";
  const headerSpeed = 25;
  
  const description = "We will tailor your experience";
  const descriptionDelay = header.length * headerSpeed + 400;
  const descriptionSpeed = 15;

  const selectionDelay = descriptionDelay + description.length * descriptionSpeed + 500;
  const selectionSpeed = 15;


  const [option, setOption] = useState(0);
  const [hoverOption, setHoverOption] = useState(-1);

  const choices = [
    "Recruiter",
    "Business Owner",
    "Patient",
    "Student"
  ]

  const descriptions = [
    "I am looking for talents to join my team.",
    "I am looking for a solution to my business problem.",
    "I am looking for a solution to my health problem.",
    "I am finding resources to learn and grow my skills."
  ]

  function chooseOption() {
    const selectedOption = choices[option];
    setUser(selectedOption);

    document.cookie = `user=${selectedOption}; path=/; max-age=31536000`; // 1 year
  }

  useEffect(() => {
    const cookies = document.cookie.split(';').reduce((acc: any, cookie) => {
      const [name, value] = cookie.trim().split('=');
      acc[name] = value;
      return acc;
    }, {});
    
    if (cookies.user) {
      setOption(choices.indexOf(cookies.user));
    }
  }, []);

  const sectionRef = React.useRef<HTMLDivElement>(null);
  const isVisibleOverride = useIntersection(
    sectionRef,
    "100%"
  )
  return (
    
    <section className="w-full h-[100vh] px-10 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold font-mono mb-4"><span className="text-primary">$</span> <TypingAnimation text={header} speedMs={headerSpeed} isVisibleOverride={isVisibleOverride} /></div>
        <div ref={sectionRef} className="text-xl font-light min-h-xl">
            <TypingAnimation text={description} delayMs={descriptionDelay} speedMs={descriptionSpeed} isVisibleOverride={isVisibleOverride} />
        </div>
        
        <div className="mt-10">
            <CLISelection
                option={option}
                setOption={setOption}
                hoverOption={hoverOption}
                setHoverOption={setHoverOption}
                choices={choices}
                descriptions={descriptions}
                delay={selectionDelay}
                speed={selectionSpeed}
                isVisibleOverride={isVisibleOverride}
                />
        </div>

        <div className={`mt-15 ${option !== -1 ? 'block' : 'hidden'}`}>
            <CLIButton text="Continue" onClick={chooseOption} delayMs={selectionDelay + selectionSpeed * choices[1].length + 500} isVisibleOverride={isVisibleOverride} />
        </div>
        
    </section>
    
  )
}
