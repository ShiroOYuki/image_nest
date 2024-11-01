import styles from './HorizonalContainer.module.css';

export default function HorizonalContainer({
    children
}: {
    children: React.ReactElement[]
}) {
    return <div className={styles.container}>
        {children}
    </div>
}