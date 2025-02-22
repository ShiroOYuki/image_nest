'use client'
import sharedStyles from "./weatherPage.module.css";
import styles from "./weatherMobile.module.css";
import { useRouter } from "next/navigation";

// components
import ClearIconButton from "@/app/components/Buttons/ClearIconButton/ClearIconButton";
import SmallWeatherCard from "@/app/components/Cards/SmallWeatherCard/SmallWeatherCard";
import BackgroundContainer from "@/app/components/Containers/BackgroundContainer/BackgroundContainer";
import SingleHoverPlot from "@/app/components/Graph/SingleHoverPlot/SingleHoverPlot";
import { weatherLayoutProps } from "./sharedInterface";
import { useEffect, useState } from "react";
import SpinningLoader from "@/app/components/LoadingAnimations/SpinningLoader/SpinningLoader";

export default function WeatherMobileLayout({
    bgs,
    weatherCategory,
    hourlyCategory,
    currTemp,
    chanceOfRain,
    hourlyTemp,
    handleHoverTemperatureChange,
    cards
}: weatherLayoutProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        chanceOfRain.timeIndex = new Date().getHours();
        setLoading(false);
    }, []);

    if (loading) return <SpinningLoader />

    return (
        <BackgroundContainer img={bgs[hourlyCategory[chanceOfRain.timeIndex as number]]} className={sharedStyles.container}>
            <div className={sharedStyles.head}>
                <SmallWeatherCard weather={weatherCategory} temp={currTemp + "°"} className={styles.weatherTitle}/>
                <ClearIconButton 
                    width={50}
                    height={50}
                    src="/imgs/icons/home.svg"
                    onClick={() => router.push("/")}
                    className={sharedStyles.linkBtn}
                    stroke="white"
                />
            </div>
            <div className={`${sharedStyles.row} ${sharedStyles.detailCards}`}>
                {cards[chanceOfRain.timeIndex as number]}
            </div>
            <div className={sharedStyles.bottom}>
                <div className={sharedStyles.row}>
                    <div className={sharedStyles.plotContainer}>
                        <SingleHoverPlot
                            className={sharedStyles.tempChart}
                            data={hourlyTemp.slice(0, 24)}
                            onHoverTemperatureChange={handleHoverTemperatureChange}
                        />
                    </div>
                </div>
            </div>
        </BackgroundContainer>
    )
}