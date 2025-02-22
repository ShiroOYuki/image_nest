'use client'

import { useCallback, useEffect, useMemo, useState } from "react";

import WeatherDetailCard from "../components/Cards/WeatherDetailCard/WeatherDetailCard";
import { Forecast } from "../utils/interfaces/api/weatherapi";
import { fetchData } from "../utils/factory/api/weatherapi/fetchWeather";
import { weatherDataFactory } from "../utils/factory/api/weatherapi/weatherHelper";
import { basicWeather } from "../utils/typesAndInterfaces";
import SpinningLoader from "../components/LoadingAnimations/SpinningLoader/SpinningLoader";
import { useLocation } from "../hooks/useLocation";
import { WeatherLayoutFactory } from "../layouts/weather/WeatherLayoutFactory";

function makeWeatherDetailCards(
    hourlyTemp: number[], 
    hourlyCategory: basicWeather[],
    hourlyChanceOfRain: number[],
    hourlyFeelslike: number[]
) {
    const cards = [];
    for(let i=0; i<hourlyTemp.length; i++) {
        cards.push(
            <WeatherDetailCard
                time={`${(i%24).toString().padStart(2, "0")}:00`}
                weather={hourlyCategory[i]}
                temp={hourlyTemp[i]}
                feelslike={hourlyFeelslike[i]}
                chanceOfRain={hourlyChanceOfRain[i]}
                key={`card-${i}`}
            />
        )
    }

    return cards;
}

function calcNextUpdateTime() {
    const date = new Date();
    const cs = date.getSeconds();    // Current seconds
    const cm = date.getMinutes();    // Current minutes
    const rm = 15 - (cm % 15);       // Minutes remaining until the next 15-minute mark

    // +10: 10-second buffer (e.g., updates at 00:00:10, 00:15:10, 00:30:10, ...)
    const nextUpdate = (rm * 60 - cs + 10) * 1000;
    return nextUpdate;
}


export default function WeatherPage() {
    const [weatherData, setWeatherData] = useState<Forecast | null>(null);
    const [loading, setLoading] = useState(true);
    const [reloading, setReloading] = useState(true);
    const [displayTime, setDisplayTime] = useState("--:--");
    const [coor, coorLoading] = useLocation();

    const bgs: {[key in basicWeather]: string} = {
        rain: "/imgs/backgrounds/weather/rain.jpg",
        clear: "/imgs/backgrounds/weather/clear.jpg",
        cloudy: "/imgs/backgrounds/weather/cloudy.jpg",
        snow: "/imgs/backgrounds/weather/snow.jpg",
        unknown: ""
    };

    const [chanceOfRain, setChanceOfRain] = useState<{
        chanceOfRain?: number, 
        timeIndex?: number | string
    }>({
        chanceOfRain: undefined,
        timeIndex: undefined
    });
    
    const handleHoverTemperatureChange = useCallback((data: { data: number; timeIndex: number }) => {
        setChanceOfRain((prev) => {
            if (prev.timeIndex !== data.timeIndex) {
                return {
                    chanceOfRain: data.data,
                    timeIndex: data.timeIndex
                }
            }
            return prev;
        });
    }, []);

    useEffect(() => {
        if ((!weatherData || reloading) && !coorLoading) {
            fetchData(coor, 2)
                .then((data: Forecast) => {
                    setWeatherData(data);
                })
                .catch((e: Error) => {
                    console.log(e.message);
                })
                .finally(() => {
                    setLoading(false);
                    setReloading(false);
                });

            console.log(coor);
        }

        const reloadInterval = setInterval(() => setReloading(true), calcNextUpdateTime());

        return () => clearInterval(reloadInterval);
    }, [reloading, coor, coorLoading]);

    const {
        currTemp,  // Current
        hourlyTemp, // Next 48 hours
        updateTime,
        location,
        weatherCategory,
        cards
    } = useMemo(() => {
        if (!weatherData) return {
            currTemp: 0,
            hourlyTemp: [],
            forecastTemp: [],
            updateTime: "",
            location: [],
            weatherCategory: "unknown" as basicWeather,
            cards: []
        };
    
        const hourlyTemp = weatherDataFactory(weatherData, "temperature");
        const hourlyFeelslike = weatherDataFactory(weatherData, "feelslike");
        const currTemp = Math.round(weatherDataFactory(weatherData, "currentTemperature"));
        const weatherCategory = weatherDataFactory(weatherData, "currCategory");
        const updateTime = weatherDataFactory(weatherData, "updateTime");
        const location = weatherDataFactory(weatherData, "location");

        const hourlyCategory = weatherDataFactory(weatherData, "hourlyCategory");
        const hourlyChanceOfRain = weatherDataFactory(weatherData, "chanceOfRain");

        const cards = makeWeatherDetailCards(hourlyTemp, hourlyCategory, hourlyChanceOfRain, hourlyFeelslike);
    
        return { currTemp, hourlyTemp, updateTime, location, weatherCategory, cards};
    }, [weatherData]);
    
    useEffect(() => {
        const hoveredTime = chanceOfRain.timeIndex?.toString().padStart(2, "0");
        if (hoveredTime) {
            setDisplayTime(`${hoveredTime}:00`);
        }
    }, [chanceOfRain.timeIndex]);

    if (loading) return <SpinningLoader />;

    return <WeatherLayoutFactory
        bg={bgs[weatherCategory]}
        updateTime={updateTime}
        displayTime={displayTime}
        location={location}
        currTemp={currTemp}
        hourlyTemp={hourlyTemp}
        weatherCategory={weatherCategory}
        cards={cards}
        chanceOfRain={chanceOfRain}
        handleHoverTemperatureChange={handleHoverTemperatureChange}
    />;
}