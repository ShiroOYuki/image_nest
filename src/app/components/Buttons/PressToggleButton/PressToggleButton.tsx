import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./PressToggleButton.module.css";

interface PressToggleButtonProps {
    className?: string;
    text: string;
    isToggle: boolean;
    setIsToggle: Dispatch<SetStateAction<boolean>>;
}

export default function PressToggleButton({
    className="",
    text,
    isToggle,
    setIsToggle
}: PressToggleButtonProps) {
    const btnRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (btnRef.current) {
            btnRef.current.classList.toggle(styles.enable, isToggle);
            btnRef.current.classList.toggle(styles.disable, !isToggle);
        }
    }, [isToggle]); // 依賴 isToggle，確保狀態變更時 UI 也變更

    const toggle = () => {
        setIsToggle(!isToggle);
    };

    return (
        <div
            onClick={toggle}
            ref={btnRef}
            className={`${styles.container} ${className}`}
        >
            <p className={styles.text}>{text}</p>
        </div>
    )
}