import ImageGallery from "../Common/Decoration/ImageGallery";
import TypingAnimation from "../Common/Decoration/TypingAnimation";

export default function WhoAmI() {

  const part1 = "whoami";
  const speed1 = 40;

  const delay2 = part1.length * speed1 + 100;
  const part2 = "I am Kapakki";
  const speed2 = 40;

  const delay3 = delay2 + part2.length * speed2 + 250;
  const part3 = ", I code";
  const speed3 = 40;
  
  const delay4 = delay3 + part3.length * speed3 + 300;
  const part4 = " and I create.";
  const speed4 = 40;

  const delay5 = delay4 + part4.length * speed4 + 300;
  const part5 = "\"The moment you make up your mind, you can achieve it within 90 days.\"";
  const speed5 = 1;

  return (
    <div className="w-full h-[100vh] px-10 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold font-mono mb-4"><span className="text-primary">$</span> <TypingAnimation text={part1} speedMs={speed1} /></div>
        <div className="text-lg font-thin">
          <TypingAnimation text={part2} speedMs={speed2} delayMs={delay2} />
          <TypingAnimation text={part3} speedMs={speed3} delayMs={delay3} />
          <TypingAnimation text={part4} speedMs={speed4} delayMs={delay4} />
        </div>
        <div className="mt-10 text-md italic text-gray-500 text-center">
          <TypingAnimation text={part5} speedMs={speed5} delayMs={delay5} />
        </div>

{/*         
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 mt-6">
          <ImageGallery images={[
            "",
            "",
        ]} />
        </div> */}
        

    </div>
  )
}
