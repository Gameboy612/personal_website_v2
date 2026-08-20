import React, { useEffect } from 'react'

export default function ScrollAction({
    handleScrollEvent,
    preventDefault = true,
    children
}: {
    handleScrollEvent?: (e: WheelEvent | TouchEvent, elem: HTMLDivElement) => void,
    preventDefault?: boolean,
    children?: React.ReactNode
}) {
    const sectionRef = React.useRef<HTMLDivElement>(null);
  
    useEffect(() => {
        const elem = sectionRef.current;
        if (!elem) return;

        const handleScroll = (e: WheelEvent | TouchEvent) => {
            preventDefault && e.preventDefault();
            handleScrollEvent && handleScrollEvent(e, elem);
        };


        elem.addEventListener('wheel', handleScroll, { passive: false });
        elem.addEventListener('touchmove', handleScroll, { passive: false });

        return () => {
            elem.removeEventListener('wheel', handleScroll);
            elem.removeEventListener('touchmove', handleScroll);
        }
    }, [])

    return (
    <div ref={sectionRef} className="w-full h-full">
        {children}
    </div>
  )
}
