'use client'

import { ReactSVG } from "react-svg";
import styles from "./WeatherDetailCard.module.css";

interface WeatherDetailCardProps {
    className?: string;
    time: string;
    weather: "rain" | "clear" | "cloudy" | "snow";
    temp: number;
    maxTemp: number;
    minTemp: number;
    chanceOfRain: number;
}

export default function WeatherDetailCard({
    className="",
    time,
    weather,
    temp,
    maxTemp,
    minTemp,
    chanceOfRain
}: WeatherDetailCardProps) {
    const icons = {
        rain: "/imgs/icons/weather/rain.svg",
        clear: "/imgs/icons/weather/clear.svg",
        cloudy: "/imgs/icons/weather/cloudy.svg",
        snow: "/imgs/icons/weather/snow.svg"
    };

    return (
        <div className={styles.container}>
            <p className={styles.time}>{time}</p>
            <div className={styles.details}>
                <ReactSVG 
                    src={icons[weather]} 
                    className={styles.bgIcon}
                    beforeInjection={(svg) => {
                        svg.setAttribute("stroke", "#758694");
                        svg.setAttribute("stroke-width", "2px");
                        svg.setAttribute("width", "100%");
                        svg.setAttribute("height", "100%");
                        svg.setAttribute("isolation", "isolate")
                    }}
                />
                <div className={styles.tempContainer}>
                    <p className={styles.temp}>{temp}°</p>
                    <div className={styles.minMaxTemp}>
                        <span className={styles.maxTemp}>{maxTemp}°</span>
                        <span className={styles.split}>|</span>
                        <span className={styles.minTemp}>{minTemp}°</span>
                    </div>
                </div>
                <div className={styles.chanceContainer}>
                    <ReactSVG 
                        src="/imgs/icons/water.svg"
                        className={styles.chanceIcon}
                        beforeInjection={(svg) => {
                            svg.setAttribute("stroke", "#7AB2D3");
                            svg.setAttribute("height", "24px");
                            svg.setAttribute("width", "24px");
                        }}
                    />
                    <p className={styles.chance}>{chanceOfRain}%</p>
                </div>
            </div>
        </div>
    )
}