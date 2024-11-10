'use client'

import { useEffect, useState } from "react";
import styles from "./PlotGraph.module.css";

function calcPoints(prices: number[], padding:number) {
    let points = "";
    const max = Math.max(...prices);
    for (let i=0; i < prices.length; i++) {
        const y = prices[i] / max * (100 - padding*2) + padding;
        const x = 100 / (prices.length-1) * i;
        points += `${x},${y} `;
    }
    return points;
}

interface PlotGraphParams {
    prices: number[],
    padding?: number
}

export default function PlotGraph({
    prices,  
    padding=0
}: PlotGraphParams) {
    const [points, setPoints] = useState<string>("");

    useEffect(() => {
        setPoints(calcPoints(prices, padding));
    }, [prices]);
    

    return <div className={styles.container}>
        <svg
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="XmaxYmax meet"
        >
            <defs>
                <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="blue" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="blue" stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon 
                points={points + "100,100 0,100"}
                fill= "url(#blue-gradient)"
            />
            <polyline 
                points={points} 
                stroke="blue"
                strokeWidth="1"
                fill="none"
            />
        </svg>
    </div>;
}