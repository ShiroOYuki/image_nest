'use client'

import { useEffect, useMemo, useState } from "react";
import styles from "./PlotGraph.module.css";
import { colorCode, PlotGraphProps } from "../PlotVariables";

function calcPoints(data: number[], padding:number) {
    if (data.length === 0) return ""; // 處理空數據
    if (data.length === 1) return `0,${100 - padding} 100,${100 - padding} `; // 單點情況

    const dataMin = Math.min(...data);
    const dataMax = Math.max(...data);
    const normalizedMax = Math.max(dataMax - dataMin, 1); // 避免除以零
    const scale = (100 - padding * 2) / normalizedMax;
    
    let points = "";
    for (let i=0; i < data.length; i++) {
        const y = (data[i] - dataMin) * scale + padding;
        const x = 100 / (data.length-1) * i;
        points += `${x},${100-y} `;
    }
    return points;
}

export default function PlotGraph({
    data,  
    padding=0,
    color="red"
}: PlotGraphProps) {
    const [points, setPoints] = useState<string>("");
    const gradientId = useMemo(() => {
        return `linear-gradient-${Date.now()}-${Math.random()}`
    }, []);

    useEffect(() => {
        setPoints(calcPoints(data, padding));
    }, [data]);
    

    return <div className={styles.container}>
        <svg
            viewBox="0 0 100 100" 
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"              // 把內容拉伸，使其大小符合父容器
        >
            <defs>
                <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor={colorCode[color]} stopOpacity="0.3" />
                    <stop offset="100%" stopColor={colorCode[color]} stopOpacity="0" />
                </linearGradient>
            </defs>
            <polygon 
                points={points + "100,100 0,100"}
                fill={`url(#${gradientId})`}
            />
            <polyline 
                points={points} 
                stroke={colorCode[color]}
                strokeWidth="1"
                fill="none"
                vectorEffect="non-scaling-stroke"   // 在縮放的同時保持原本的線寬
            />
        </svg>
    </div>;
}