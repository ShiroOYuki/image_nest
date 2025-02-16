'use client'

import { calcPoints } from "@/app/utils/svgTools";
import styles from "./MinMaxAvgTempPlot.module.css";
import PlotLine from "../PlotElements/PlotLine";
import { LinearGradient } from "../PlotElements/LinearGradient";
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import { colorCode } from "../PlotVariables";
import { clamp } from "@/app/utils/utils";

interface MinMaxAvgTempPlotProps {
    minTemps: number[];
    maxTemps: number[];
    avgTemps: number[];
    className?: string;
    onHoverTemperatureChange?: (temps: { 
        min: number; 
        max: number; 
        avg: number; 
        timeIndex: number;
    }) => void;
}

export default function MinMaxAvgTempPlot({
    minTemps,
    maxTemps,
    avgTemps,
    className = "",
    onHoverTemperatureChange
}: MinMaxAvgTempPlotProps) {
    const PlotRef = useRef<SVGSVGElement>(null);
    
    const [blueGradientId, setBlueGradientId] = useState("");
    const [redGradientId, setRedGradientId] = useState("");

    const [linePos, setLinePos] = useState([0, 0, 0]);

    useEffect(() => {
        setBlueGradientId(uuid());
        setRedGradientId(uuid());
        
        const handleMouseMove = (event: MouseEvent) => {
            if (PlotRef.current) {
                const rect = PlotRef.current.getBoundingClientRect();
                const x = event.clientX - rect.left; // 滑鼠相對於元素的 X 座標
                // const y = event.clientY - rect.top;  // 滑鼠相對於元素的 Y 座標
                const n = minTemps.length;
                const space = rect.width / (n-1);
                const idx = Math.ceil(clamp(x - space/2, 0, rect.width) / space);
                
                setLinePos([
                    clamp(idx*space/rect.width*100, 1, 99),
                    0,
                    rect.height
                ]);

                if (onHoverTemperatureChange) {
                    onHoverTemperatureChange({
                        min: minTemps[idx],
                        max: maxTemps[idx],
                        avg: avgTemps[idx],
                        timeIndex: idx,
                    });
                }
            }
        };
    
        const r = PlotRef.current;
        if (r) {
            r.addEventListener("mousemove", handleMouseMove); // 綁定事件
        }
    
        return () => {
            if (r) {
                r.removeEventListener("mousemove", handleMouseMove); // 清理事件
            }
        };
    }, []);

    const padding = 10;

    const upperBound = Math.max(...maxTemps);
    const lowerBound = Math.min(...minTemps);

    const minTempPos = calcPoints(minTemps, padding, upperBound, lowerBound);
    const maxTempPos = calcPoints(maxTemps, padding, upperBound, lowerBound);
    const avgTempPos = calcPoints(avgTemps, padding, upperBound, lowerBound).split(" ").reverse().join(" ");

    const blueFillPos = `${minTempPos} ${avgTempPos}`;
    const redFillPos = `${maxTempPos} ${avgTempPos}`;

    return (
        <div className={`${styles.container} ${className}`} >
            <svg
                viewBox="0 0 100 100" 
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                height="100%"
                preserveAspectRatio="none"              // 把內容拉伸，使其大小符合父容器
                ref={PlotRef}
            >
                <LinearGradient gradientId={blueGradientId} color="blue" reversed={false} />
                <LinearGradient gradientId={redGradientId} color="red" reversed={true} />
                
                <polygon 
                    points={blueFillPos}
                    fill={`url(#${blueGradientId})`}
                />
                <polygon 
                    points={redFillPos}
                    fill={`url(#${redGradientId})`}
                />

                <PlotLine data={maxTemps} color="red" padding={padding} upperBound={upperBound} lowerBound={lowerBound}/>
                <PlotLine data={avgTemps} color="white" padding={padding} upperBound={upperBound} lowerBound={lowerBound}/>
                <PlotLine data={minTemps} color="blue" padding={padding} upperBound={upperBound} lowerBound={lowerBound}/>
                
                <line 
                    x1={linePos[0]}
                    y1={linePos[1]}
                    x2={linePos[0]}
                    y2={linePos[2]}
                    strokeWidth={0.1}
                    stroke={colorCode.white}
                    strokeDasharray="1,1"
                />
            </svg>
        </div>
    )
}