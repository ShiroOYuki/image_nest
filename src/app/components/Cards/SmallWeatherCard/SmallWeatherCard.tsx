"use client"

import { ReactSVG } from "react-svg";
import styles from "./SmallWeatherCard.module.css";
import { basicWeather } from "@/app/utils/typesAndInterfaces";


interface SmallWeatherCardProps {
    className?: string;
    weather: basicWeather;
    temp: string;
}

export default function SmallWeatherCard({
    className="",
    weather,
    temp
}: SmallWeatherCardProps) {
    const icons: {[key in basicWeather]: string} = {
        rain: "/imgs/icons/weather/rain.svg",
        clear: "/imgs/icons/weather/clear.svg",
        cloudy: "/imgs/icons/weather/cloudy.svg",
        snow: "/imgs/icons/weather/snow.svg",
        unknown: ""
    };

    return (
        <div className={`${styles.container} ${className}`}>
            <div className={styles.left}>
                <ReactSVG 
                    src={icons[weather]}
                    className={styles.icon} 
                    beforeInjection={(svg) => {
                        svg.setAttribute("stroke-width", "2px");
                        svg.setAttribute("width", "50");
                        svg.setAttribute("height", "50");
                        svg.setAttribute("stroke", "#FAF7F0");
                    }}
                />
                <p className={styles.weatherType}>{weather}</p>
            </div>
            <p className={styles.temp}>{temp}</p>
        </div>
    )
}