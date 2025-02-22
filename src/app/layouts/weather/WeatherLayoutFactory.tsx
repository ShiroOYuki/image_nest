'use client'

import useDeviceType from "@/app/hooks/useDeviceType";
import { weatherLayoutProps } from "./sharedInterface";
import WeatherMobileLayout from "./WeatherMobile";
import WeatherDesktopLayout from "./WeatherDesktop";
import { useEffect, useState } from "react";
import SpinningLoader from "@/app/components/LoadingAnimations/SpinningLoader/SpinningLoader";

export function WeatherLayoutFactory(props: weatherLayoutProps) {
    const deviceType = useDeviceType();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) return <SpinningLoader />

    switch (deviceType) {
        case "mobile":
            console.log("Using mobile layout.");
            return <WeatherMobileLayout {...props} />;
        case "desktop":
            console.log("Using desktop layout.");
            return <WeatherDesktopLayout {...props} />;
        default:
            console.log("Using default layout.");
            return <WeatherDesktopLayout {...props} />;
    }
}