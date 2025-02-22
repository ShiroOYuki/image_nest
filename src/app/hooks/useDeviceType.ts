'use client'

import { useEffect, useState } from "react"

const breakPoints = {
    mobile: 480,
    tablet: 768,
    desktop: 1024
};

export default function useDeviceType() {
    const [deviceType, setDeviceType] = useState<keyof typeof breakPoints>("desktop");
    
    useEffect(() => {
        function handleResize() {
            const width = window.innerWidth;
            for(const [k, v] of Object.entries(breakPoints)) {
                if (width <= v) {
                    setDeviceType(k as keyof typeof breakPoints);
                    break;
                }
            }
        }

        handleResize();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return deviceType;
}