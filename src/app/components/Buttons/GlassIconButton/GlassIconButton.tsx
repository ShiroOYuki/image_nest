'use client'

import styles from "./GlassIconButton.module.css";
import mixinStyles from "@/app/shared/styles/mixin.module.css";
import { useState } from "react";
import { ReactSVG } from 'react-svg';
import SpeechBubble from "../../Items/SpeechBubble/SpeechBubble";

export default function GlassIconButton({
    width,
    height,
    src,
    onClick,
    className="",
    stroke="black",
    hint="link"
}: {
    width: number;
    height: number;
    src: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
    stroke?: string;
    hint?: string;
}) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className={`${styles.button} ${mixinStyles.glass} ${mixinStyles.clickable} ${className}`}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: `${width}px`,
                height: `${height}px`
            }}
        >
            <ReactSVG 
                src={src} 
                className={styles.icon} 
                beforeInjection={(svg) => {
                    svg.setAttribute("stroke", stroke)
                }}
            />

            {
                isHovered && 
                <SpeechBubble 
                    text={hint} 
                    className={styles.hint} // 使用額外的 class 來調整位置
                />
            }
        </div>
    );
}