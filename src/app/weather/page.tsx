'use client'

import { useEffect, useState } from "react";
import SmallWeatherCard from "../components/Cards/SmallWeatherCard/SmallWeatherCard";
import WeatherDetailCard from "../components/Cards/WeatherDetailCard/WeatherDetailCard";
import CalenderTitle from "../components/Clocks/CalenderTitle/CalenderTitle";
import BackgroundContainer from "../components/Containers/BackgroundContainer/BackgroundContainer";
import styles from "./weatherPage.module.css";
import { Forecast } from "../utils/interfaces/api/weatherapi";
import { fetchData } from "../utils/factory/api/weatherapi/fetchWeather";
import SingleHoverPlot from "../components/Graph/SingleHoverPlot/SingleHoverPlot";
import { weatherDataFactory } from "../utils/factory/api/weatherapi/weatherHelper";
import { getLocation } from "../utils/utils";
import MinMaxAvgTempPlot from "../components/Graph/MinMaxAvgTempPlot/MinMaxAvgTempPlot";

export default function WeatherPage() {
    const bgs = [
        "/imgs/backgrounds/weather/rain.jpg",
        "/imgs/backgrounds/weather/clear.jpg",
        "/imgs/backgrounds/weather/cloudy.jpg",
        "/imgs/backgrounds/weather/snow.jpg"
    ];

    const [currTemprature, setCurrTemprature] = useState<{
        chanceOfRain?: number, 
        timeIndex?: number | string
    }>({
        chanceOfRain: undefined,
        timeIndex: undefined
    });
    
    const handleHoverTemperatureChange = (data: { data: number; timeIndex: number }) => {
        setCurrTemprature({
            chanceOfRain: data.data,
            timeIndex: data.timeIndex
        });
    };
    
    const [weatherData, setWeatherData] = useState<Forecast | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const coor = getLocation();
        fetchData(
            setWeatherData, 
            setLoading, 
            null, 
            {
                coordinate: coor, 
                days: 1
            });
    }, []);
    
    if (loading) return <p>Loading...</p>;

    if (typeof weatherData === "undefined" || weatherData == null) return <p>Error</p>;

    const hourlyTemprature = weatherDataFactory(weatherData, "temperature");
    const temperature = Math.round(weatherDataFactory(weatherData, "currentTemperature"));
    const weatherCategory = weatherDataFactory(weatherData, "currCategory");
    const updateTime = weatherDataFactory(weatherData, "updateTime");
    const location = weatherDataFactory(weatherData, "location");
    const forecastTemp = weatherDataFactory(weatherData, "temperature");

    console.log(weatherData)
    console.log(forecastTemp)

    return (
        <BackgroundContainer img={bgs[0]} className={styles.container}>
            <CalenderTitle location={location[1]} datetime={updateTime} className={styles.title}/>
            <div className={styles.bottom}>
                <div className={styles.row}>
                    <SmallWeatherCard weather={weatherCategory} temp={temperature + "°"} />
                    <div className={styles.plotContainer}>
                        <p className={styles.plotValue}>
                            {currTemprature.timeIndex?.toString().padStart(2, "0")}:00 | {currTemprature.chanceOfRain?.toFixed(1)}°C
                        </p>
                        <SingleHoverPlot
                            className={styles.tempChart}
                            data={hourlyTemprature}
                            onHoverTemperatureChange={handleHoverTemperatureChange}
                        />
                    </div>
                </div>
                <div className={styles.row}>
                    <WeatherDetailCard
                        time="03:00"
                        weather="rain"
                        temp={16}
                        maxTemp={24}
                        minTemp={12}
                        chanceOfRain={88}
                    />
                    <WeatherDetailCard
                        time="03:00"
                        weather="clear"
                        temp={16}
                        maxTemp={24}
                        minTemp={12}
                        chanceOfRain={88}
                    />
                    <WeatherDetailCard
                        time="03:00"
                        weather="cloudy"
                        temp={16}
                        maxTemp={24}
                        minTemp={12}
                        chanceOfRain={88}
                    />
                    <WeatherDetailCard
                        time="03:00"
                        weather="snow"
                        temp={16}
                        maxTemp={24}
                        minTemp={12}
                        chanceOfRain={88}
                    />
                </div>
            </div>
        </BackgroundContainer>
    )
}