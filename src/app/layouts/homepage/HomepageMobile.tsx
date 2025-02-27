'use client'
import styles from "./Homepage.module.css"

import BackgroundContainer from "@/app/components/Containers/BackgroundContainer/BackgroundContainer";
import TimerLayout from "../timer/TimerLayout";
import Calender1 from "@/app/components/Clocks/Calender1/Calender1";
import Clock1 from "@/app/components/Clocks/Clock1/Clock1";
import { WeatherCardFactory } from "@/app/components/Cards/WeatherCard/WeatherCard";
import mixinStyles from "@/app/shared/styles/mixin.module.css";
import { HomepageLayoutProps } from "./sharedInterface";
import VerticalExpendedButton from "@/app/components/Buttons/VerticalExpendedButton/VerticalExpendedButton";

export default function HomepageMobileLayout({
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
    toolsButton,
    zenCanselButton,
    zenLayoutStyle
}: HomepageLayoutProps) {
    console.log(zenMode);

    return (
        <BackgroundContainer img={bgs[bgId]} className={styles.container} brightness={brightness}>
            {zenMode? <TimerLayout closeBtn={zenCanselButton} className={zenLayoutStyle} ref={timerLayoutRef}/>:<></>}
            <div className={styles.header}>
                <div className={styles.left}>
                </div>
                <div className={styles.center}>
                    <Calender1 className={styles.calender} />
                </div>
                <div className={styles.right}>
                    {toolsButton}
                </div>
            </div>
            <div className={styles.body}>
                <Clock1 className={styles.clock} />
            </div>
            <div className={styles.footer}>
                <div className={styles.left}></div>
                <div className={styles.center}></div>
                <div className={styles.right}>
                    <p>#Ciel</p>
                </div>
            </div>
        </BackgroundContainer> 
    )
}