'use client'

import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

export default function useTimer(totalTime: number): [number, boolean, (val: boolean) => void] {
    const [ct, setCt] = useState(0);
    const runningRef = useRef(false);

    useEffect(() => {
        if (ct >= totalTime) {
            setRunning(false);
            return
        }

        if (runningRef.current) {
            const timer = setTimeout(() => {
                setCt((prev) => prev+0.1);
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [ct])

    const setRunning = (val: boolean) => {
        runningRef.current = val;
    }

    return [ct, runningRef.current, setRunning];
}