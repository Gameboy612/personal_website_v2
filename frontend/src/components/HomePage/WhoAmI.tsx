import ImageGallery from "../Common/Decoration/ImageGallery";
import TypingAnimation from "../Common/Decoration/TypingAnimation";

export default function WhoAmI() {
  return (
    <div className="w-full h-[100vh] px-10 flex flex-col items-center justify-center">
        <div className="text-2xl font-bold font-mono mb-4"><span className="text-primary">$</span> <TypingAnimation text="whoami" speedMs={40} /></div>
        <div className="text-lg font-thin">I am Kapakki, I code and I create.</div>
        <div></div>

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
