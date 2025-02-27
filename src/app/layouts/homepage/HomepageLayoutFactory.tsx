'use client'

import useDeviceType from "@/app/hooks/useDeviceType";
import { HomepageLayoutProps } from "./sharedInterface";
import HomepageDesktopLayout from "./HomepageDesktop";
import HomepageMobileLayout from "./HomepageMobile";

export function HomepageLayoutFactory(props: HomepageLayoutProps) {
    const deviceType = useDeviceType();

    switch(deviceType) {
        case "mobile":
            return <HomepageMobileLayout {...props} />;
        case "desktop":
            return <HomepageDesktopLayout {...props} />;
        default:
            return <HomepageDesktopLayout {...props} />;
    }
}