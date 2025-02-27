import useTimer from "@/app/hooks/useTimer";
import styles from "./DigitCountdownTimer.module.css";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ReactSVG } from "react-svg";
import { isDigit } from "@/app/utils/utils";


interface DigitCountdownTimerProps {
    subtitle?: string;
    subtitleOnRunning?: string;
    subtitleOnFinish?: string;
    subtitleOnPause?: string;
}

function buttonFactory(
    onClick: () => void,
    iconSrc: string
) {
    return (
        <ReactSVG
            src={iconSrc}
            beforeInjection={(svg) => {
                svg.style.stroke = "white";
                svg.style.strokeWidth = "2";
                svg.style.width = "100%"
                svg.style.height = "100%"
            }}
            onClick={onClick}
            className={`${styles.icon} ${styles.hidden}`}
        />
    )
}

export default function DigitCountdownTimer({
    subtitle="",
    subtitleOnRunning="",
    subtitleOnPause="",
    subtitleOnFinish=""
}: DigitCountdownTimerProps) {
    const [totalTime, setTotaltime] = useState(600);
    const [displayTime, setDisplayTime] = useState(["1", "0", "0", "0"]);
    const [timer, setTimer, running, setRunning, finish, resetFunc] = useTimer(totalTime);
    const [displaySubtitle, setDisplaySubtitle] = useState(subtitle);

    if (subtitleOnRunning === "") subtitleOnRunning = subtitle;
    if (subtitleOnPause === "") subtitleOnPause = subtitle;
    if (subtitleOnFinish === "") subtitleOnFinish = subtitle;

    // set subtitle
    useEffect(() => {
        if (finish) setDisplaySubtitle(subtitleOnFinish);
        else if (timer > 0 && !running) setDisplaySubtitle(subtitleOnPause);
        else if (running) setDisplaySubtitle(subtitleOnRunning);
        else setDisplaySubtitle(subtitle);
    }, [timer, running])

    // set timer total time
    useEffect(() => {
        const newTotaltime = parseInt(displayTime.slice(0, 2).join("")) * 60 + parseInt(displayTime.slice(2, 4).join(""))
        setTotaltime(newTotaltime);
        setTimer(totalTime);
    }, [displayTime]);

    // start timer button
    const startBtn = useMemo(() => {return buttonFactory(() => {setRunning(true)}, "/imgs/icons/play.svg")}, []);

    // pause timer button
    const pauseBtn = useMemo(() => {return buttonFactory(() => {setRunning(false)}, "/imgs/icons/square.svg")}, []);

    // reset timer button
    const resetBtn = useMemo(() => {return buttonFactory(resetFunc, "/imgs/icons/restart.svg")}, []);

    // change total time when user input
    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        console.log(e.key, e.key === "Process", isDigit(e.key));
        if (e.key === "Process") {
            e.preventDefault();
            return;
        }
        else if (e.key === "Backspace") {
            e.preventDefault();
            const input = e.currentTarget.value.replace(/\D/g, "");
            
            setDisplayTime(["0", ...input.padStart(4, "0").slice(0, 3)]);
        }
        else if (isDigit(e.key)) {
            let input = e.currentTarget.value.replace(/\D/g, ""); // 只允許數字
            if (input.length > 4) input = input.slice(1, 5); // 限制 4 位數

            setDisplayTime([...input.split("").slice(1, 4), e.key]);
        }
    }, []);

    const minute = Math.max(Math.floor((totalTime - timer) / 60), 0);
    const second = Math.max(Math.floor((totalTime - timer) % 60), 0);

    return (
        <div className={styles.container}>
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
                                onChange={() => {}}
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