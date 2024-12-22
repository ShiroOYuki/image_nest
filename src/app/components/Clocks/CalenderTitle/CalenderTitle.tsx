import styles from "./CalenderTitle.module.css";

interface CalenderTitleProps {
    className?: string;
    location: string;
    datetime: string;
}

export default function CalenderTitle({
    className="",
    location,
    datetime
}: CalenderTitleProps ) {
    return (
        <div className={`${styles.container} ${className}`}>
            <p className={styles.location}>{location}</p>
            <p className={styles.datetime}>{datetime}</p>
        </div>
    );
}