import styles from "./GlassIconButton.module.css";
import mixinStyles from "@/app/shared/styles/mixin.module.css";
import { ReactSVG } from 'react-svg';

export default function GlassIconButton({
    width,
    height,
    src,
    onClick,
    className="",
    stroke="black"
}: {
    width: number;
    height: number;
    src: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    className?: string;
    stroke?: string;
}) {
    return (
        <div 
            className={`${styles.button} ${mixinStyles.glass} ${mixinStyles.clickable} ${className}`}
            onClick={onClick}
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
        </div>
    )
}