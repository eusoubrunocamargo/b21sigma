import { useEffect, useState } from "react";

export function useVisible(ref){
    const [isIntersect, setIsIntersect] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) =>
        setIsIntersect(entry.isIntersecting),
        {threshold: 0.75});

        observer.observe(ref.current);

        return () => {
            observer.disconnect();
        };
    }, [ref]);

    return isIntersect
}