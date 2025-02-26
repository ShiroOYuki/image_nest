import useTimer from "@/app/hooks/useTimer";
import CircleProgress from "../../ProgressBars/CircleProgress";
import styles from "./CircleCountdownTimer.module.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ReactSVG } from "react-svg";
import useDeviceType from "@/app/hooks/useDeviceType";


interface CircleCountdownTimerProps {
    subtitle?: string;
    subtitleOnRunning?: string;
    subtitleOnFinish?: string;
    subtitleOnPause?: string;
}

export default function CircleCountdownTimer({
    subtitle="",
    subtitleOnRunning="",
    subtitleOnPause="",
    subtitleOnFinish=""
}: CircleCountdownTimerProps) {
    const [totalTime, setTotaltime] = useState(600);
    const [displayTime, setDisplayTime] = useState(["1", "0", "0", "0"]);
    const [timer, setTimer, running, setRunning, finish, resetFunc] = useTimer(totalTime);
    const [displaySubtitle, setDisplaySubtitle] = useState(subtitle);
    const deviceType = useDeviceType();

    if (subtitleOnRunning === "") subtitleOnRunning = subtitle;
    if (subtitleOnPause === "") subtitleOnPause = subtitle;
    if (subtitleOnFinish === "") subtitleOnFinish = subtitle;

    useEffect(() => {
        if (finish) setDisplaySubtitle(subtitleOnFinish);
        else if (timer > 0 && !running) setDisplaySubtitle(subtitleOnPause);
        else if (running) setDisplaySubtitle(subtitleOnRunning);
        else setDisplaySubtitle(subtitle);
    }, [timer, running])

    useEffect(() => {
        setTotaltime(parseInt(displayTime.slice(0, 2).join("")) * 60 + parseInt(displayTime.slice(2, 4).join("")));
    }, [displayTime]);

    useEffect(() => {
        setTimer(totalTime);
    }, [totalTime]);

    const startBtn = useMemo(() => {
        return (
            <ReactSVG
                src="/imgs/icons/play.svg"
                beforeInjection={(svg) => {
                    svg.style.stroke = "white";
                    svg.style.strokeWidth = "2";
                    svg.style.width = "100%"
                    svg.style.height = "100%"
                }}
                onClick={() => {setRunning(true)}}
                className={`${styles.icon} ${styles.hidden}`}
            />
        )
    }, []);

    const pauseBtn = useMemo(() => {
        return (
            <ReactSVG
                src="/imgs/icons/square.svg"
                beforeInjection={(svg) => {
                    svg.style.stroke = "white";
                    svg.style.strokeWidth = "2";
                    svg.style.width = "100%"
                    svg.style.height = "100%"
                }}
                onClick={() => {setRunning(false)}}
                className={`${styles.icon} ${styles.hidden}`}
            />
        )
    }, []);

    const resetBtn = useMemo(() => {
        return (
            <ReactSVG
                src="/imgs/icons/restart.svg"
                beforeInjection={(svg) => {
                    svg.style.stroke = "white";
                    svg.style.strokeWidth = "2";
                    svg.style.width = "100%"
                    svg.style.height = "100%"
                }}
                onClick={resetFunc}
                className={`${styles.icon} ${styles.hidden}`}
            />
        )
    }, []);

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, ""); // 只允許數字
        if (input.length > 4) input = input.slice(1, 5); // 限制 4 位數

        setDisplayTime(input.split(""));
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            e.preventDefault();
            const input = e.currentTarget.value.replace(/\D/g, "");
            
            setDisplayTime(["0", ...input.padStart(4, "0").slice(0, 3)]);
        }
    };

    const minute = Math.max(Math.floor((totalTime - timer) / 60), 0);
    const second = Math.max(Math.floor((totalTime - timer) % 60), 0);

    return (
        <div className={styles.container}>
            {deviceType === "desktop" ?
                <CircleProgress
                    r={30}
                    currentPercent={timer}
                    totalPercent={totalTime}
                    maxFillPercent={70}
                    className={styles.progress}
                    color="#7AB2D3"
                    trackColor="#1b1b1b"
                /> : <></>
            }
            <div className={styles.center}>
                <div className={styles.displayTime}>
                    {
                        (running || finish || (timer > 0 && !finish))? (
                            <>
                                <span>{minute.toString().padStart(2, "0")}</span>
                                <span>:</span>
                                <span>{second.toString().padStart(2, "0")}</span>
                            </>
                        ) : (
                            <input 
                                type="text" 
                                value={`${displayTime[0]}${displayTime[1]}:${displayTime[2]}${displayTime[3]}`}
                                onChange={handleChange}
                                onKeyDown={handleKeyDown}
                                maxLength={6}
                            />
                        )
                    }
                </div>
                <p className={styles.subtitle} key={displaySubtitle}>
                    {displaySubtitle}
                </p>
            </div>
            <div className={styles.control}>
                { running? [
                    <div key="pause" className={styles.btn}>{pauseBtn}</div>,
                    <div key="reset" className={styles.btn}>{resetBtn}</div>
                ] : ( finish? (
                    <div key="done" className={styles.btn}>{resetBtn}</div>
                ) : ( timer > 0? [
                    <div key="pauseStart" className={styles.btn}>{startBtn}</div>,
                    <div key="pauseReset" className={styles.btn}>{resetBtn}</div>
                ] : (
                    <div key="start" className={styles.btn}>{startBtn}</div>
                )))}
            </div>
        </div>
    )
}