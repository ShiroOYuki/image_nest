import React, { useEffect, useState } from "react"
import styles from "./WeatherCard.module.css"
import mixinStyles from "@/app/shared/styles/mixin.module.css"
import { ReactSVG } from "react-svg";
import { WeatherPlotGraph, WeatherPlotProps } from "../../Graph/WeatherPlotGraph/WeatherPlotGraph";
import { Coordinate, Forecast, ForecastRequiredProps } from "@/app/utils/interfaces/api/weatherapi";
import { fetchData } from "@/app/utils/factory/api/weatherapi/fetchWeather";
import { weatherDataFactory } from "@/app/utils/factory/api/weatherapi/weatherHelper";
import { PlotGraphProps } from "../../Graph/PlotVariables";
import PlotGraph from "../../Graph/PlotGraph/PlotGraph";

interface CardType {
    type: "temperature" | "chanceOfRain" | "default";
}

interface WeatherCardFactoryProps extends ForecastRequiredProps, CardType {};

export function WeatherCardFactory({
    type="default",
    coordinate,
    days=1
}: WeatherCardFactoryProps) {
    const [weatherData, setWeatherData] = useState<Forecast | null>(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetchData(
            setWeatherData,
            setLoading,
            setIsError,
            {
                coordinate: coordinate,
                days: days
            }
        );

        const updateCard = setInterval(() => {
            fetchData(
                setWeatherData,
                setLoading,
                setIsError,
                {
                    coordinate: coordinate,
                    days: days
                }
            );
        }, 10*60*1000);

        return () => clearInterval(updateCard);
    }, []);

    if (loading) return <p>Loading...</p>;

    console.log(weatherData);
    
    let data = [2, 2];
    let title: string | number = "--";
    let location = ["???", "???"];
    let updateTime = "--:--";

    switch(type) {
        case "temperature":
            if (!isError) {
                data = weatherDataFactory(weatherData, "temperature") as number[];
                title = Math.round(weatherDataFactory(weatherData, "currentTemperature") as number);
                updateTime = weatherDataFactory(weatherData, "updateTime") as string;
                location = weatherDataFactory(weatherData, "location") as string[];
            }
            
            return <WeatherCard 
                type={type}
                data={data}
                title={title}
                updateTime={updateTime.split(" ")[1]}
                locationCity={location[0]}
                locationRegion={location[1]}
            />

        case "chanceOfRain":
            if (!isError) {
                data = weatherDataFactory(weatherData, "chanceOfRain") as number[];
                title = Math.round(weatherDataFactory(weatherData, "dailyChanceOfRain") as number);
                updateTime = weatherDataFactory(weatherData, "updateTime") as string;
                location = weatherDataFactory(weatherData, "location") as string[];
            } 

            
            return <WeatherCard 
                type={type}
                data={data}
                title={title}
                updateTime={updateTime.split(" ")[1]}
                locationCity={location[0]}
                locationRegion={location[1]}
            />
    }
}

interface WeatherCardProps extends PlotGraphProps, CardType {
    title?: string | number;
    locationCity?: string;
    locationRegion?: string;
    updateTime?:string;
    iconColor?: "white" | "black";
}

/**
 * 
 * @param title Current Temperature, Feelslike, or Chance of Rain.
 * @param locationCity The city within the region (e.g., Los Angeles, Toronto).
 * @param locationRegion The region or state of the location (e.g., California, Ontario).
 */
function WeatherCard({
    data,
    type="default",
    title="0",
    locationCity="",
    locationRegion="",
    updateTime="",
    iconColor="white",
    padding=10,
    color="white"
}: WeatherCardProps) {
    let titleRow = <p className={styles.title}>{title}</p>;
    if (type === "chanceOfRain") titleRow = <p className={`${styles.title} ${styles.popTitle}`}>{title}</p>
    if (type === "temperature") titleRow = <p className={`${styles.title} ${styles.temperatureTitle}`}>{title}</p>

    return (
        <div className={`${styles.container} `}>
            <div className={styles.info}>
                <div className={styles.location}>
                    <ReactSVG 
                        src="imgs/icons/map-pin.svg"
                        className={styles.locationIcon} 
                        beforeInjection={(svg) => {
                            svg.setAttribute("stroke", iconColor)
                            svg.setAttribute("width", "16");
                            svg.setAttribute("height", "16");
                        }}
                    />
                    {/* <span>{locationCity}</span>
                    <span>-</span> */}
                    <span>{locationRegion}</span>
                    <span>|</span>
                    <span>{updateTime}</span>
                </div>
                {titleRow}
            </div>
            <div className={styles.graphContainer}>
                <PlotGraph 
                    data={data}
                    padding={padding}
                    color={color}
                />
            </div>
        </div>
    )
}