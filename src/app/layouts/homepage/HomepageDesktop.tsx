'use client'
import styles from "./Homepage.module.css"

import BackgroundContainer from "@/app/components/Containers/BackgroundContainer/BackgroundContainer";
import TimerLayout from "../timer/TimerLayout";
import Calender1 from "@/app/components/Clocks/Calender1/Calender1";
import Clock1 from "@/app/components/Clocks/Clock1/Clock1";
import { WeatherCardFactory } from "@/app/components/Cards/WeatherCard/WeatherCard";
import mixinStyles from "@/app/shared/styles/mixin.module.css";
import { HomepageLayoutProps } from "./sharedInterface";

export default function HomepageDesktopLayout({
    bgs,
    bgId,
    brightness,
    zenMode,
    changing,
    location,
    timerLayoutRef,
    nowBrightness,
    setBrightness,
    weatherButton,
    changeImageButton,
    zenButton,
    zenCanselButton,
    zenLayoutStyle
}: HomepageLayoutProps) {
    console.log(zenMode);
    return (
        <BackgroundContainer img={bgs[bgId]} className={styles.container} brightness={brightness}>
            {zenMode? <TimerLayout closeBtn={zenCanselButton} className={zenLayoutStyle} ref={timerLayoutRef}/>:<></>}
            <div className={styles.header}>
                <div className={styles.left}>
                    {weatherButton}
                    {zenButton}
                </div>
                <div className={styles.center}>
                    <Calender1 className={styles.calender} />
                </div>
                <div className={styles.right}>
                    {changeImageButton}
                    <input 
                        type="range" 
                        name="brightness" 
                        id={styles.brightness} 
                        className={`${mixinStyles.rounded} ${styles.lightnessController}`}
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
                <Clock1 className={styles.clock} />
            </div>
            <div className={styles.footer}>
                <div className={styles.left}></div>
                <div className={styles.center}>
                    <WeatherCardFactory
                        type="temperature"
                        coordinate={location}
                        days={1}
                        className={styles.weatherCard}
                    />
                    <WeatherCardFactory 
                        type="chanceOfRain"
                        coordinate={location}
                        days={1}
                        className={styles.weatherCard}
                    />
                </div>
                <div className={styles.right}>
                    <p>#Ciel</p>
                </div>
            </div>
        </BackgroundContainer> 
    )
}