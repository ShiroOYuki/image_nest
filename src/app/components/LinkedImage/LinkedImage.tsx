import Link from "next/link";
import ImageBox from "../ImageBox/ImageBox";
import styles from "./LinkedImage.module.css"

export default function LinkedImage({
    src,
    placeholder,
    url
}: {
    src: string,
    placeholder: string,
    url: string
}) {
    return <Link href={url} className={styles.link}>
        <ImageBox src={src} placeholder={placeholder} />
    </Link>
}