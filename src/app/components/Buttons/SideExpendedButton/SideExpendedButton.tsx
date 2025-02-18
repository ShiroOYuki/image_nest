'use client'

import { ReactSVG } from "react-svg";
import styles from "./SideExpendedButton.module.css";

interface SideExpendedButtonProps {
    icon: string;
    text: string[];
    onClick: React.MouseEventHandler<HTMLDivElement>[];
    className?: string;
    iconColor?: string;
}

export default function SideExpendedButton({
    icon,
    text,
    onClick,
    className="",
    iconColor="black"
}: SideExpendedButtonProps) {
    // assert(text.length === onClick.length);

    const items = [];
    for (let i=0; i<text.length; i++) {
        items.push(
            <div className={styles.item} onClick={onClick[i]} key={`item-${i}`}>
                <p className={styles.text}>{text[i]}</p>
            </div>
        )
    }

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.head}>
                <ReactSVG 
                    src={icon}
                    className={styles.icon}
                    beforeInjection={(svg) => {
                        svg.setAttribute("stroke", iconColor);
                    }}
                />
            </div>
            <div className={styles.items}>
                {items}
            </div>
        </div>
    );
}