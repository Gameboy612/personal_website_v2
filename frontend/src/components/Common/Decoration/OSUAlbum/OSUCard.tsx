import { useContext } from "react";
import { OSUCardData, OSUMathProvider } from "./OSUMathProvider";

export default function OSUCard({
    theta,
    deltaTheta,
    card,
    cardIndex
}: {
    theta: number,
    deltaTheta: number,
    card: OSUCardData,
    cardIndex: number
}) {
  const { r, C_x, C_y, scaleFactor, numRenderedCards, currentWorldTheta, selectedIndex } = useContext(OSUMathProvider);
  let adjustedTheta = currentWorldTheta - theta;

  const numSideRenderedCards = Math.floor(numRenderedCards / 2);

  const unsigned_mod = (n: number, m: number) => ((n % m) + m) % m;

  // Loop back
  const sidePos = Math.PI - deltaTheta * numSideRenderedCards;

  adjustedTheta = Math.abs(unsigned_mod(
    (adjustedTheta - sidePos), (deltaTheta * numRenderedCards)
  ) + sidePos);

  const x = C_x + r * Math.cos(adjustedTheta);
  const y = C_y + r * Math.sin(adjustedTheta);

  let finalScale = - scaleFactor * Math.abs(adjustedTheta - Math.PI) + 1;

  const isSelected = selectedIndex === cardIndex;

  // To remove the flying over animation, we can set opacity to zero
  return (
    <div className={`absolute h-[15%] aspect-[3] border border-gray-300 rounded-lg shadow-md -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out ${isSelected ? 'text-primary bg-amber-100' : 'bg-gray-200 '}`}
    style={{
        left: `${x}%`,
        top: `${y}%`,
        scale: `${finalScale}`,
        opacity: Math.abs(adjustedTheta - Math.PI) > (numSideRenderedCards - 1) * deltaTheta ? "0" : "1"
    }}>
        <div className="flex flex-col justify-center h-full pl-6">
          <h3 className={`text-xl font-bold ${isSelected ? 'text-primary' : 'text-gray-800'}`}>{card.title}</h3>
          <p className="font-mono text-gray-600">{card.description}</p>
          <p className={`font-mono ${isSelected ? 'text-secondary' : 'text-gray-500'}`}>{card.date}</p>
        </div>
      </div>
    )
}
