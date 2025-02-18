'use client'

import { useEffect, useRef, useState } from "react";
import ClearIconButton from "./components/Buttons/ClearIconButton/ClearIconButton";
import Calender1 from "./components/Clocks/Calender1/Calender1";
import Clock1 from "./components/Clocks/Clock1/Clock1";
import BackgroundContainer from "./components/Containers/BackgroundContainer/BackgroundContainer";
import styles from "./page.module.css";
import mixinStyles from "@/app/shared/styles/mixin.module.css";

import { useRouter } from "next/navigation";
import { getLocation } from "./utils/utils";
import { Coordinate } from "./utils/interfaces/api/weatherapi";
import { WeatherCardFactory } from "./components/Cards/WeatherCard/WeatherCard";
import SpinningLoader from "./components/LoadingAnimations/SpinningLoader/SpinningLoader";

export default function Page() {
    const router = useRouter();
    const [brightness, setBrightness] = useState<number>(0.6);
    const nowBrightness = useRef(brightness);

    const bgs = ["/imgs/backgrounds/bg1.png", "/imgs/backgrounds/bg2.png", "/imgs/backgrounds/bg3.jpg"];
    const [bg, setBg] = useState(0);
    const [changing, setchanging] = useState(false);
    const [location, setLocation] = useState<Coordinate>([0, 0]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // auto change background per 60s
        const bgTimer = setInterval(() => {
            setchanging(true);
        }, 60*1000);

        setLocation(getLocation());
        setLoading(false);

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

    if (loading) return <SpinningLoader />;

    const weatherButton = (
        <ClearIconButton
            width={50}
            height={50}
            src="/imgs/icons/cloud.svg"
            onClick={() => router.push("/weather")}
            className={styles.linkBtn}
            stroke="white"
        ></ClearIconButton>
    )

    const changeImageButton = (
        <ClearIconButton
            width={50}
            height={50}
            src="/imgs/icons/arrow-right-left.svg"
            onClick={() => {if(!changing) setchanging(true)}}
            className={styles.linkBtn}
            stroke="white"
        ></ClearIconButton>
    )

    return (
        <BackgroundContainer img={bgs[bg]} className={styles.container} brightness={brightness}>
            <div className={styles.header}>
                <div className={styles.left}>
                    {weatherButton}
                </div>
                <div className={styles.center}>
                    <Calender1 />
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
                <Clock1 />
            </div>
            <div className={styles.footer}>
                <div className={styles.left}></div>
                <div className={styles.center}>
                    <WeatherCardFactory 
                        type="temperature"
                        coordinate={location}
                        days={1}
                    />
                    <WeatherCardFactory 
                        type="chanceOfRain"
                        coordinate={location}
                        days={1}
                    />
                </div>
                <div className={styles.right}>
                    <p>#Ciel</p>
                </div>
            </div>
        </BackgroundContainer> 
    )
}