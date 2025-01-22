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

export default function WeatherPage() {
    const bgs = [
        "/imgs/backgrounds/weather/rain.jpg",
        "/imgs/backgrounds/weather/clear.jpg",
        "/imgs/backgrounds/weather/cloudy.jpg",
        "/imgs/backgrounds/weather/snow.jpg"
    ];

    const [currChanceOfRain, setCurrOfRainInfo] = useState<{
        chanceOfRain?: number, 
        timeIndex?: number | string
    }>({
        chanceOfRain: undefined,
        timeIndex: undefined
    });
    
    const handleHoverTemperatureChange = (data: { data: number; timeIndex: number }) => {
        setCurrOfRainInfo({
            chanceOfRain: data.data,
            timeIndex: data.timeIndex
        });
        console.log(`時間索引：${data.timeIndex}, 降雨機率：${data.data}`);
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

    const chanceOfRain = weatherDataFactory(weatherData, "chanceOfRain");

    console.log(chanceOfRain);

    return (
        <BackgroundContainer img={bgs[0]} className="">
            <CalenderTitle location="Taipei" datetime="2024/12/19 10:29" />
            <SmallWeatherCard weather="rain" temp="16°" />
            <SmallWeatherCard weather="clear" temp="16°" />
            <SmallWeatherCard weather="cloudy" temp="16°" />
            <SmallWeatherCard weather="snow" temp="16°" />
            <div>
                <p>{currChanceOfRain.timeIndex} {currChanceOfRain.chanceOfRain}%</p>
                <SingleHoverPlot 
                    className={styles.tempChart}
                    data={chanceOfRain}
                    onHoverTemperatureChange={handleHoverTemperatureChange}
                />
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
        </BackgroundContainer>
    )
}