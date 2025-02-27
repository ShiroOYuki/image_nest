'use client'

import CircleCountdownTimer from "@/app/components/Clocks/CircleCountdownTimer/CircleCountdownTimer";
import styles from "./TimerLayout.module.css";
import { MutableRefObject } from "react";
import useDeviceType from "@/app/hooks/useDeviceType";
import DigitCountdownTimer from "@/app/components/Clocks/DigitCountdownTimer/DigitCountdownTimer";

interface TimerLayoutProps {
    closeBtn: JSX.Element,
    className?: string,
    ref?: MutableRefObject<HTMLDivElement | null> | null
}

export default function TimerLayout({
    closeBtn,
    className="",
    ref=null
}: TimerLayoutProps) {
    const deviceType = useDeviceType();

    return (
        <div className={`${styles.container} ${className}`} ref={ref}>
            <div className={styles.row}>
                {closeBtn}
            </div>
            {
                deviceType === "desktop"?   
                <CircleCountdownTimer
                    subtitle="Hello ヾ(•ω•`)o"
                    subtitleOnRunning="Stay focused"
                    subtitleOnPause="Relax for a moment"
                    subtitleOnFinish="Well done"
                /> :
                <DigitCountdownTimer
                    subtitle="Hello ヾ(•ω•`)o"
                    subtitleOnRunning="Stay focused"
                    subtitleOnPause="Relax for a moment"
                    subtitleOnFinish="Well done"
                />
            }
        </div>
    )
}