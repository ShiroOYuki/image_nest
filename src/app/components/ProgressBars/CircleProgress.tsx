import { ReactSVG } from "react-svg";
import styles from "./CircleProgress.module.css";
import { Colors } from "../Graph/PlotVariables";

interface CircleProgressProps {
    r: number;
    currentPercent: number;
    totalPercent: number;
    maxFillPercent: number;
    strokeWidth?: number;
    color?: string;
    trackColor?:string;
    className?: string;
}

export default function CircleProgress({
    r,
    currentPercent,
    totalPercent,
    maxFillPercent,
    strokeWidth=5,
    color="white",
    trackColor="#1e1e1e",
    className=""
}: CircleProgressProps) {
    const percent = currentPercent / totalPercent * maxFillPercent;
    
    return (
        <div className={`${styles.container} ${className}`}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* track */}
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    pathLength="100"
                    strokeDasharray={`${maxFillPercent} ${100 - maxFillPercent}`}
                    strokeLinecap="round"
                    stroke={trackColor}
                    strokeWidth={strokeWidth}
                    transform="rotate(145, 50, 50)"
                />

                {/* progress */}
                <circle
                    cx="50"
                    cy="50"
                    r={r}
                    fill="none"
                    pathLength="100"
                    strokeDasharray={`${percent} ${100 - percent}`}
                    strokeLinecap="round"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    transform="rotate(145, 50, 50)"
                    className={styles.progress}
                />
            </svg>
        </div>
    );
}