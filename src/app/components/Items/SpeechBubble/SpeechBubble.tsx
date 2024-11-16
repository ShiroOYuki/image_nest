import { useEffect, useRef, useState } from "react";
import styles from "./SpeechBubble.module.css";

function checkBoundred() {

}

export default function SpeechBubble({
    text="",
    className=""
}: {
    text?: string;
    className?: string;
}) {
    const bubbleRef = useRef<HTMLDivElement | null>(null);
    const [bubblePosition, setBubblePosition] = useState("center");

    useEffect(() => {
        if (bubbleRef.current) {
            const bubbleRect = bubbleRef.current.getBoundingClientRect();
            const windowSize = window.innerWidth;
            if (bubbleRect.left < 0) 
                setBubblePosition("left");
            else if (bubbleRect.right > windowSize)
                setBubblePosition("right");
            else 
                setBubblePosition("center"); 
        }
    }, []);

    return (
        <div className={`${styles.bubble} ${className}`} ref={bubbleRef}>
            <p className={styles.text}>{text}</p>
        </div>
    );
}