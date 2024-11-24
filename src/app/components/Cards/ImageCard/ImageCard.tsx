'use client'

import ImageBox from '../../ImageBox/ImageBox';
import styles from './ImageCard.module.css';
import ScrollXContainer from '../../Containers/ScrollXContainer/ScrollXContainer';

import mixinStyles from '@/app/shared/styles/mixin.module.css';
import Image from 'next/image';



export default function ImageCard({
    src,
    placeholder="image",
    title="unknown",
    descripton="",
    authorIcon="/imgs/default/user.svg",
    authorName="Anonymous"
}: {
    src: string,
    placeholder?: string,
    title?: string,
    descripton?: string,
    authorIcon?: string,
    authorName?: string
}) {
    return (
        <section className={`${styles.card} ${mixinStyles.rounded} ${mixinStyles.shadow}`}>
            <div className={styles.head}>
                <ImageBox src={src} placeholder={placeholder}></ImageBox>
            </div>
            <div className={styles.body}>
                <ScrollXContainer>
                    <h1 className={styles.title}>{title}</h1>
                </ScrollXContainer>
                <p className={styles.desc}>{descripton}</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.author}>
                    <Image className={styles.icon} src={authorIcon} alt="" />
                    <p className={styles.name}>{authorName}</p>
                </div>
            </div>
        </section>
    )
}