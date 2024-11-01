import styles from './ImageBox.module.css'
import mixinStyles from '@/app/shared/styles/mixin.module.css'

export default function ImageBox({
    src,
    placeholder
}: {
    src: string,
    placeholder: string
}) {
    return (
        <div className={styles.imagebox}>
            <img src={src} alt={placeholder} className={`${styles.image} ${mixinStyles.rounded}`} />
        </div>
    )
}