import styles from "./CircleProgress.module.css";

interface CircleProgressProps {
    r: number;
    currentPercent: number;
    totalPercent: number;
    maxFillPercent: number;
    strokeWidth?: number;
    rotate?: number;
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
    rotate=144.5,
    color="white",
    trackColor="#1e1e1e",
    className=""
}: CircleProgressProps) {
    const percent = totalPercent===0? maxFillPercent : Math.min(currentPercent / totalPercent * maxFillPercent, maxFillPercent);
    
    return (
        <div className={`${styles.container} ${className}`}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                {/* shadow */}
                <defs>
                    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feDropShadow dx="0" dy="0" stdDeviation="1" floodColor={color} floodOpacity="0.5"/>
                    </filter>
                </defs>

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
                    transform={`rotate(${rotate}, 50, 50)`}
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
                    transform={`rotate(${rotate}, 50, 50)`}
                    className={styles.progress}
                    filter="url(#shadow)"
                />
            </svg>
        </div>
    );
}