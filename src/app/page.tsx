'use client'

import { useEffect, useRef, useState } from "react";
import GlassIconButton from "./components/Buttons/GlassIconButton/GlassIconButton";
import Calender1 from "./components/Clocks/Calender1/Calender1";
import Clock1 from "./components/Clocks/Clock1/Clock1";
import BackgroundContainer from "./components/Containers/BackgroundContainer/BackgroundContainer";
import styles from "./page.module.css";
import mixinStyles from "@/app/shared/styles/mixin.module.css";

import { useRouter } from "next/navigation";
import { WeatherPlotFactory } from "./components/Graph/WeatherPlotGraph/WeatherPlotGraph";

export default function Page() {
    const router = useRouter();
    const [brightness, setBrightness] = useState<number>(0.6);
    const nowBrightness = useRef(brightness);

    const bgs = ["/imgs/backgrounds/bg1.png", "/imgs/backgrounds/bg2.png", "/imgs/backgrounds/bg3.jpg"];
    const [bg, setBg] = useState(0);
    const [changing, setchanging] = useState(false);

    // auto change background per 60s
    useEffect(() => {
        const bgTimer = setInterval(() => {
            setchanging(true);
        }, 60*1000);

        return () => clearInterval(bgTimer);
    }, []);

    // linear change background
    useEffect(() => {
        if (changing) {
            nowBrightness.current = brightness;
            setBrightness(1);
            const changingTimer = setTimeout(() => {
                setBg(prevBg => (prevBg+1) % bgs.length);
                setBrightness(nowBrightness.current);
                setchanging(false);
            }, 1000);
            return () => clearInterval(changingTimer);
        }
    }, [changing]);

    const galleryButton = (
        <GlassIconButton
            width={50}
            height={50}
            src="/imgs/icons/layout-dashboard.svg"
            onClick={() => router.push("/gallery")}
            className={styles.linkBtn}
            stroke="white"
            hint="Gallery"
        ></GlassIconButton>
    )

    const cryptoButton = (
        <GlassIconButton
            width={50}
            height={50}
            src="/imgs/icons/chart-line.svg"
            onClick={() => router.push("/crypto")}
            className={styles.linkBtn}
            stroke="white"
            hint="Crypto"
        ></GlassIconButton>
    )

    const changeImageButton = (
        <GlassIconButton
            width={50}
            height={50}
            src="/imgs/icons/arrow-right-left.svg"
            onClick={() => {if(!changing) setchanging(true)}}
            className={styles.linkBtn}
            stroke="white"
            hint="Switch"
        ></GlassIconButton>
    )

    return (
        <BackgroundContainer img={bgs[bg]} className={styles.container} brightness={brightness}>
            <div className={styles.header}>
                <div className={styles.left}>
                    {galleryButton}
                    {cryptoButton}
                </div>
                <div className={styles.center}>
                    <Calender1></Calender1>
                </div>
                <div className={styles.right}>
                    {changeImageButton}
                    <input 
                        type="range" 
                        name="brightness" 
                        id={styles.brightness} 
                        className={mixinStyles.rounded}
                        min="0" 
                        max="1" 
                        step="0.01" 
                        defaultValue="0.6"
                        onChange={(e) => {
                            nowBrightness.current = parseFloat(e.target.value);
                            if (!changing) setBrightness(nowBrightness.current);
                        }}
                    />
                </div>
            </div>
            <div className={styles.body}>
                <Clock1></Clock1>
            </div>
            <div className={styles.footer}>
                <div className={styles.left}></div>
                <div className={styles.center}>
                    <WeatherPlotFactory 
                        locationName="高雄市" 
                        feature="temperature" 
                        color="white"
                        timeFrom="2024-11-18T00:00:00"
                        timeTo="2024-11-19T18:00:00"
                    />
                </div>
                <div className={styles.right}>
                    <p>#Shiro</p>
                </div>
            </div>
        </BackgroundContainer> 
    )
}