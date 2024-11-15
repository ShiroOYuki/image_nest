import React from "react"
import styles from "./BackgroundContainer.module.css"

export default function BackgroundContainer({
    children = null,
    className = "",
    img,
    brightness = 0.2
}: {
    children?: React.ReactNode;
    className?: string;
    img: string;
    brightness?: number;
}) {
    return (
        <div 
            className={`${styles.container} ${className}`} 
            style={{
                backgroundImage: `url(${img})`,
                backgroundColor: `rgba(0, 0, 0, ${brightness})`
            }}
        >
            {children}
        </div>
    )
}