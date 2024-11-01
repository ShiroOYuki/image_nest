'use client'

import { useEffect, useRef } from 'react';
import ImageBox from '../../ImageBox/ImageBox'
import styles from './ImageCard.module.css'
import mixinStyles from '@/app/shared/styles/mixin.module.css';

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
    const scrollXItem = useRef<HTMLHeadingElement>(null);
    const scrollAmount = useRef(0);
    const isScrolling = useRef(false);

    const handleScrollX = (e: WheelEvent) => {
        e.preventDefault();
        if (scrollXItem.current) {
            scrollAmount.current += e.deltaY; // 增加滑動距離
            startSmoothScrollX();
        }
    };

    const startSmoothScrollX = () => {
        // 如果已經在滑動中，則不重複執行
        if (isScrolling.current) return; 
        isScrolling.current = true;

        const smoothScroll = () => {
            if (!scrollXItem.current) return;

            const currentScrollLeft = scrollXItem.current.scrollLeft;
            const targetScrollLeft = currentScrollLeft + scrollAmount.current * 0.1; // 每次滑動距離的10%

            scrollXItem.current.scrollLeft = targetScrollLeft;

            // 減少 scrollAmount，逐步接近 0
            scrollAmount.current *= 0.9;

            // 當 scrollAmount 非零時，繼續滾動
            if (Math.abs(scrollAmount.current) > 10) {
                console.log(scrollAmount);
                requestAnimationFrame(smoothScroll);
            } else {
                isScrolling.current = false; // 完成滑動
                scrollAmount.current = 0; // 重置滑動距離
            }
        };

        requestAnimationFrame(smoothScroll);
    };

    useEffect(() => {
        const current = scrollXItem.current;
        if (current) {
            current.addEventListener('wheel', handleScrollX, {passive: false});
            return () => current.removeEventListener("wheel", handleScrollX);
        }
    }, []);


    return (
        <section className={`${styles.card} ${mixinStyles.rounded} ${mixinStyles.shadow}`}>
            <div className={styles.head}>
                <ImageBox src={src} placeholder={placeholder}></ImageBox>
            </div>
            <div className={styles.body}>
                <h1 className={styles.title} ref={scrollXItem}>{title}</h1>
                <p className={styles.desc}>{descripton}</p>
            </div>
            <div className={styles.footer}>
                <div className={styles.author}>
                    <img className={styles.icon} src={authorIcon}></img>
                    <p className={styles.name}>{authorName}</p>
                </div>
            </div>
        </section>
    )
}