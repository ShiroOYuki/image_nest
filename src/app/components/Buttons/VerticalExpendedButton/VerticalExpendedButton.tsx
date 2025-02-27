'use client'

import { ReactSVG } from "react-svg";
import styles from "./VerticalExpendedButton.module.css";
import ClearIconButton from "../ClearIconButton/ClearIconButton";
import { useState } from "react";

interface VerticalExpendedButtonProps {
    icons: string[];
    onClick: React.MouseEventHandler<HTMLDivElement>[];
    className?: string;
}

export default function VerticalExpendedButton({
    icons,
    onClick,
    className=""
}: VerticalExpendedButtonProps) {
    // assert(text.length === onClick.length);
    const [show, setShow] = useState(false);

    const items = [];
    for (let i=0; i<icons.length; i++) {
        items.push(
            <ClearIconButton 
                width={50}
                height={50}
                src={icons[i]}
                onClick={onClick[i]}
                className={styles.item}
                stroke="white"
                key={i}
            />
        )
    }

    const handleClick = () => {
        setShow(!show);
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={`${styles.head} ${show?styles.expended:""}`} onClick={handleClick}>
                <ReactSVG 
                    src="/imgs/icons/arrow-down.svg"
                    className={styles.icon}
                    beforeInjection={(svg) => {
                        svg.setAttribute("stroke", "white");
                    }}
                />
            </div>
            <div className={styles.itemsBound}>
                <div className={`${styles.items} ${show? "":styles.hidden}`}>
                    {items}
                </div>
            </div>
        </div>
    );
}