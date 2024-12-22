"use client"

import { ReactSVG } from "react-svg";
import styles from "./SmallWeatherCard.module.css";


interface SmallWeatherCardProps {
    className?: string;
    weather: "rain" | "clear" | "cloudy" | "snow";
    temp: string;
}

export default function SmallWeatherCard({
    className="",
    weather,
    temp
}: SmallWeatherCardProps) {
    const icons = {
        rain: "/imgs/icons/weather/rain.svg",
        clear: "/imgs/icons/weather/clear.svg",
        cloudy: "/imgs/icons/weather/cloudy.svg",
        snow: "/imgs/icons/weather/snow.svg"
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