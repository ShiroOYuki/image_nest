import useTimer from "@/app/hooks/useTimer";
import CircleProgress from "../../ProgressBars/CircleProgress";
import styles from "./CircleCountdownTimer.module.css";
import { useEffect, useState } from "react";
import { ReactSVG } from "react-svg";


interface CircleCountdownTimerProps {
    totalTime: number;
    subtitle?: string;
    subtitleOnFinish?: string;
    subtitleOnPause?: string;
}

export default function CircleCountdownTimer({
    totalTime,
    subtitle="",
    subtitleOnPause="",
    subtitleOnFinish=""
}: CircleCountdownTimerProps) {
    const [timer, running, setRunning] = useTimer(totalTime);
    const minute = Math.floor((totalTime - timer) / 60);
    const second = (totalTime - timer) % 60;
    const [displaySubtitle, setDisplaySubtitle] = useState(subtitle);

    if (subtitleOnPause === "") subtitleOnPause = subtitle;
    if (subtitleOnFinish === "") subtitleOnFinish = subtitle;

    useEffect(() => {
        if (timer > 0 && !running) setDisplaySubtitle(subtitleOnPause);
        else if (timer < totalTime) setDisplaySubtitle(subtitle);
        else setDisplaySubtitle(subtitleOnFinish);
    }, [timer, running])

    return (
        <div className={styles.container}>
            <CircleProgress
                r={30}
                currentPercent={timer}
                totalPercent={totalTime}
                maxFillPercent={70}
            />
            <div className={styles.displayTime}>
                <span>{minute.toString().padStart(2, "0")}</span>
                <span>:</span>
                <span>{second.toString().padStart(2, "0")}</span>
            </div>
            <div className={styles.subtitle}>
                {displaySubtitle}
            </div>
            <ReactSVG
                src="/imgs/icons/play.svg"
                beforeInjection={(svg) => {
                    svg.style.stroke = "white";
                    svg.style.strokeWidth = "4";
                }}
                onClick={() => {
                    setRunning(true);
                }}
            />

            <ReactSVG
                src="/imgs/icons/square.svg"
                beforeInjection={(svg) => {
                    svg.style.stroke = "white";
                    svg.style.strokeWidth = "4";
                }}
                onClick={() => {
                    setRunning(false);
                    console.log("pause")
                }}
            />
        </div>
    )
}