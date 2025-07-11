'use client'

import { useEffect, useState } from "react";
import styles from "./Calender1.module.css";

function getDate(): string[] {
    const date = new Date()
    const y = date.getFullYear().toString().padStart(4, "0");
    const m = (date.getMonth() + 1).toString().padStart(2, "0");
    const d = date.getDate().toString().padStart(2, "0");

    return [y, m, d];
}

export default function Calender1({className=""}: {className?: string}) {
    const [date, setDate] = useState<string[]>(getDate()); // y, m, d
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(getDate());
        }, 1000);

        setLoading(false);
        return () => clearInterval(timer);
    }, []);

    if (loading) return <p>Loading...</p>

    return (
        <div className={`${styles.calender} ${className}`}>
            <span className={styles.date}>{date[0]}</span>
            <span className={styles.symbol}>/</span>
            <span className={styles.date}>{date[1]}</span>
            <span className={styles.symbol}>/</span>
            <span className={styles.date}>{date[2]}</span>
        </div>
    )
}