'use client'
import styles from "./weatherPage.module.css";
import { useRouter } from "next/navigation";

// components
import ClearIconButton from "@/app/components/Buttons/ClearIconButton/ClearIconButton";
import SmallWeatherCard from "@/app/components/Cards/SmallWeatherCard/SmallWeatherCard";
import CalenderTitle from "@/app/components/Clocks/CalenderTitle/CalenderTitle";
import BackgroundContainer from "@/app/components/Containers/BackgroundContainer/BackgroundContainer";
import SingleHoverPlot from "@/app/components/Graph/SingleHoverPlot/SingleHoverPlot";
import { weatherLayoutProps } from "./sharedInterface";

export default function WeatherDesktopLayout({
    bg,
    location,
    updateTime,
    weatherCategory,
    currTemp,
    displayTime,
    chanceOfRain,
    hourlyTemp,
    handleHoverTemperatureChange,
    cards
}: weatherLayoutProps) {
    const router = useRouter();
    const cHour = new Date().getHours();

    return (
        <BackgroundContainer img={bg} className={styles.container}>
            <div className={styles.head}>
                <div className={styles.row}>
                    <CalenderTitle location={location[1]} datetime={updateTime} className={styles.title}/>
                    <ClearIconButton 
                        width={50}
                        height={50}
                        src="/imgs/icons/external-link.svg"
                        onClick={() => window.open("https://www.weatherapi.com/weather", "_blank")}
                        className={styles.externalLinkBtn}
                    />
                </div>
                <ClearIconButton 
                    width={50}
                    height={50}
                    src="/imgs/icons/home.svg"
                    onClick={() => router.push("/")}
                    className={styles.linkBtn}
                    stroke="white"
                />
            </div>
            <div className={styles.bottom}>
                <div className={styles.row}>
                    <SmallWeatherCard weather={weatherCategory} temp={currTemp + "°"} />
                    <div className={styles.plotContainer}>
                        <p className={styles.plotValue}>
                            {displayTime} | {chanceOfRain.chanceOfRain?.toFixed(1) || "--"}°C
                        </p>
                        <SingleHoverPlot
                            className={styles.tempChart}
                            data={hourlyTemp.slice(0, 24)}
                            onHoverTemperatureChange={handleHoverTemperatureChange}
                        />
                    </div>
                </div>
                <div className={`${styles.row} ${styles.detailCards}`}>
                    {cards.slice(cHour, cHour+8)}
                </div>
            </div>
        </BackgroundContainer>
    )
}