import styles from "./SpinningLoader.module.css";

export default function SpinningLoader() {
    return (
        <div className={styles.container}>
            <img className={styles.loading} src="/imgs/loadings/spinner1.svg" alt="Loading..." />
        </div>
    );
}