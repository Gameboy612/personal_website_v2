import TypingAnimation from './TypingAnimation'
import BlinkingAnimation from './BlinkingAnimation'

export default function CLIButton({
    text,
    delayMs = 0,
    speedMs = 70,
    blinkSpeedMs = 1000,
    onClick = () => {},
    isVisibleOverride = undefined
}: {
    text: string,
    delayMs?: number,
    speedMs?: number,
    blinkSpeedMs?: number,
    onClick?: () => void,
    isVisibleOverride?: boolean | undefined
}) {
  return (
    <div onClick={onClick} className="flex flex-row text-lg font-mono cursor-pointer hover:text-primary">
        <TypingAnimation text={text} delayMs={delayMs} speedMs={speedMs} isVisibleOverride={isVisibleOverride} />
        <BlinkingAnimation text="..." delayMs={speedMs * text.length + delayMs} speedMs={blinkSpeedMs} isVisibleOverride={isVisibleOverride} />
    </div>

  )
}
