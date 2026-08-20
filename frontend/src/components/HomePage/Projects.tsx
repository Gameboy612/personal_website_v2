import React, { useEffect, useState } from 'react'
import ScrollAction from '../Common/Utils/ScrollAction'
import OSUAlbum from '../Common/Decoration/OSUAlbum';
import useIntersection from '@/hooks/useIntersection';

declare global {
    // Note the capital "W"
    interface Window { ProjectsComponentData: any; }
}

export default function Projects() {

  const sectionRef = React.useRef<HTMLDivElement>(null);

  const isIntersecting = useIntersection(sectionRef, "0px");

  const [diskPosition, setDiskPosition] = useState(0);
    const touchYRef = React.useRef<number | null>(null);

  const [allowScrollUp, setAllowScrollUp] = useState(false);
  const [allowScrollDown, setAllowScrollDown] = useState(false);

    useEffect(() => {
        window.ProjectsComponentData = { allowScrollUp, allowScrollDown, isIntersecting };
        
        // Optional cleanup when component unmounts
        return () => {
        delete window.ProjectsComponentData;
        };
    }, [allowScrollUp, allowScrollDown, isIntersecting]);

  function handleScrollEvent(e: WheelEvent | TouchEvent, elem: HTMLDivElement) {
        if (!window.ProjectsComponentData.isIntersecting) {
            console.log("Not intersecting, ignoring scroll event");
            return;
        }

        if (e instanceof WheelEvent) {
            setDiskPosition((prevPosition) => prevPosition + e.deltaY);
            if (e.deltaY > 0) {
                // Scroll down
                console.log("Scroll down", window.ProjectsComponentData.allowScrollDown);

                if (!window.ProjectsComponentData.allowScrollDown) {
                    e.preventDefault();
                }
            } else {
                // Scroll up
                console.log("Scroll up");

                console.log("allowScrollUp", window.ProjectsComponentData.allowScrollUp);

                if (!window.ProjectsComponentData.allowScrollUp) {
                    e.preventDefault();
                }
            }
        } else if (e instanceof TouchEvent) {
            if (e.type === "touchstart") {
                touchYRef.current = e.touches[0]?.clientY ?? null;
                return;
            }

            if (e.type === "touchend" || e.type === "touchcancel") {
                touchYRef.current = null;
                return;
            }

            const currentY = e.touches[0]?.clientY;
            if (currentY === undefined || touchYRef.current === null) {
                return;
            }

            const deltaY = touchYRef.current - currentY;
            touchYRef.current = currentY;

            if (deltaY === 0) {
                return;
            }

            setDiskPosition((prevPosition) => prevPosition + deltaY);

            const canScroll = deltaY > 0
                ? window.ProjectsComponentData.allowScrollDown
                : window.ProjectsComponentData.allowScrollUp;

            if (!canScroll) {
                e.preventDefault();
            }
        }
        console.log(elem)
    }

  
  return (
    <section className="w-full h-[100dvh] relative">
        <ScrollAction handleScrollEvent={handleScrollEvent} preventDefault={false}>
            <OSUAlbum scrollPosition={diskPosition} setAllowScrollDown={setAllowScrollDown} setAllowScrollUp={setAllowScrollUp} />
        </ScrollAction>

        <div ref={sectionRef} className="absolute bottom-0 left-0 w-full h-1 pointer-events-none" />
    </section>
  )
}
