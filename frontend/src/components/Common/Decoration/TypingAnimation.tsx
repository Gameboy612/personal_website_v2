import useIntersection from '@/hooks/useIntersection'
import { useState, useEffect, useRef } from 'react'

export default function TypingAnimation({
    text,
    speedMs = 70,
    delayMs = 0,
    rootMargin = "0px",
    isVisibleOverride = undefined
}: {
    text: string,
    speedMs?: number,
    delayMs?: number,
    rootMargin?: string,
    isVisibleOverride?: boolean | undefined
}) {
  const [index, setIndex] = useState(0)
  
  const selfRef = useRef<HTMLSpanElement>(null)

  const isVisible = isVisibleOverride !== undefined ? isVisibleOverride : useIntersection(
    selfRef,
    rootMargin
  )

  useEffect(() => {
    if (!isVisible) {
        setIndex(0);
        return;
    };
    let interval: NodeJS.Timeout;
    const timeout = setTimeout(() => {
        interval = setInterval(() => {
            setIndex((x: number) => {return (x + 1)})

            if (index == text.length) {
                clearInterval(interval);
                clearTimeout(timeout);
            }
        }, speedMs);
    }, delayMs);


    return () => {
        clearInterval(interval);
        clearTimeout(timeout);
    }

  }, [text, speedMs, isVisible])
  return (
    <span ref={selfRef}>{text.slice(0, index)}</span>
  )
}
