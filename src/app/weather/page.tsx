'use clinet'

import SmallWeatherCard from "../components/Cards/SmallWeatherCard/SmallWeatherCard";
import WeatherDetailCard from "../components/Cards/WeatherDetailCard/WeatherDetailCard";
import CalenderTitle from "../components/Clocks/CalenderTitle/CalenderTitle";
import BackgroundContainer from "../components/Containers/BackgroundContainer/BackgroundContainer";
import MinMaxAvgTempPlot from "../components/Graph/MinMaxAvgTempPlot/MinMaxAvgTempPlot";
import styles from "./weatherPage.module.css";

export default function WeatherPage() {

    const bgs = [
        "/imgs/backgrounds/weather/rain.jpg",
        "/imgs/backgrounds/weather/clear.jpg",
        "/imgs/backgrounds/weather/cloudy.jpg",
        "/imgs/backgrounds/weather/snow.jpg"
    ]

    return (
        <BackgroundContainer img={bgs[0]} className="">
            <CalenderTitle location="Taipei" datetime="2024/12/19 10:29" />
            <SmallWeatherCard weather="rain" temp="16°" />
            <SmallWeatherCard weather="clear" temp="16°" />
            <SmallWeatherCard weather="cloudy" temp="16°" />
            <SmallWeatherCard weather="snow" temp="16°" />
            <MinMaxAvgTempPlot
                className={styles.tempChart}
                minTemps={[10, 12, 13, 15, 17, 18, 17, 11, 10, 10, 12, 13, 15, 17, 18, 17, 11, 10, 10, 12, 13, 15, 17, 18, 17, 11, 10]}
                avgTemps={[13, 13, 14, 18, 20, 19, 18, 15, 13, 13, 13, 14, 18, 20, 19, 18, 15, 13, 13, 13, 14, 18, 20, 19, 18, 15, 13]}
                maxTemps={[15, 14, 17, 19, 21, 20, 19, 20, 15, 15, 14, 17, 19, 21, 20, 19, 20, 15, 15, 14, 17, 19, 21, 20, 19, 20, 15]}
            />
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