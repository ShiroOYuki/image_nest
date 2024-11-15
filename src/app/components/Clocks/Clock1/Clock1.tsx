'use client'

import { useEffect, useState } from "react";
import styles from "./Clock1.module.css"
import mixinStyles from "@/app/shared/styles/mixin.module.css";

function getTime(): string[] {
    const d = new Date()
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    const s = d.getSeconds().toString().padStart(2, "0");
    return [h, m, s];
}

export default function Clock1() {
    const [time, setTime] = useState<string[]>(getTime()); // h, m, s
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(getTime());
        }, 1000);

        setLoading(false);
        return () => clearInterval(timer);
    }, []);

    if (loading) return <p>Loading...</p>

    return (
        <div className={styles.clock}>
            <span className={styles.hour}>{time[0]}</span>
            <span className={styles.symbol}>:</span>
            <span className={styles.minute}>{time[1]}</span>
            <span className={styles.second}>{time[2]}</span>
        </div>
    )
}