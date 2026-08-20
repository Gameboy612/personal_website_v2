import React, { useEffect, useState } from 'react'


// https://rasilbaidar.medium.com/trigger-event-when-element-enters-viewport-the-react-way-168509da2e23
export default function useIntersection(element: React.RefObject<HTMLElement>, rootMargin: string = "0px") {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const current = element?.current;
        const observer = new IntersectionObserver(
            (entries: IntersectionObserverEntry[]) => {
                setIsVisible(entries[0].isIntersecting);
            },
            { rootMargin }
        )

        current && observer.observe(current);

        return () => {current && observer.unobserve(current)};
    }, [])


    return isVisible;

}
