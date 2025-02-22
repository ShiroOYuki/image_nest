'use client'

import useDeviceType from "@/app/hooks/useDeviceType";
import { weatherLayoutProps } from "./sharedInterface";
import WeatherMobileLayout from "./WeatherMobile";
import WeatherDesktopLayout from "./WeatherDesktop";

export function WeatherLayoutFactory(props: weatherLayoutProps) {
    const deviceType = useDeviceType();

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