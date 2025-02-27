'use client'

import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";

export default function useTimer(totalTime: number): [number, Dispatch<SetStateAction<number>>, boolean, Dispatch<SetStateAction<boolean>>, boolean, () => void] {
    const [ct, setCt] = useState(0);
    const [running, setRunning] = useState(false);
    const [total, setTimer] = useState(totalTime);
    const [finish, setFinish] = useState(false);

    const resetTimer = useCallback(() => {
        setCt(0);
        setRunning(false);
        setFinish(false);
    }, []);

    useEffect(() => {
        if (ct >= total) {
            setRunning(false);
            setFinish(true);
            return
        }

        if (running) {
            const timer = setTimeout(() => {
                setCt((prev) => prev+0.1);
            }, 100);
            
            return () => clearTimeout(timer);
        }
    }, [ct, running])

    return [ct, setTimer, running, setRunning, finish, resetTimer];
}