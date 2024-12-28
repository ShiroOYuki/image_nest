'use client'

import { useEffect, useMemo, useState } from "react";
import styles from "./PlotGraph.module.css";
import { colorCode, PlotGraphProps } from "../PlotVariables";
import { calcPoints } from "@/app/utils/svgTools";
import { LinearGradient } from "../PlotElements/LinearGradient";

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
            <LinearGradient gradientId={gradientId} color={color} />
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