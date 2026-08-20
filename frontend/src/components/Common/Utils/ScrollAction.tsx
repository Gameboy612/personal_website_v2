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

        const handleTouchBoundary = (e: TouchEvent) => {
            handleScrollEvent && handleScrollEvent(e, elem);
        };


        elem.addEventListener('wheel', handleScroll, { passive: false });
        elem.addEventListener('touchmove', handleScroll, { passive: false });
        elem.addEventListener('touchstart', handleTouchBoundary, { passive: true });
        elem.addEventListener('touchend', handleTouchBoundary, { passive: true });
        elem.addEventListener('touchcancel', handleTouchBoundary, { passive: true });

        return () => {
            elem.removeEventListener('wheel', handleScroll);
            elem.removeEventListener('touchmove', handleScroll);
            elem.removeEventListener('touchstart', handleTouchBoundary);
            elem.removeEventListener('touchend', handleTouchBoundary);
            elem.removeEventListener('touchcancel', handleTouchBoundary);
        }
    }, [handleScrollEvent, preventDefault])

    return (
    <div ref={sectionRef} className="w-full h-full">
        {children}
    </div>
  )
}
