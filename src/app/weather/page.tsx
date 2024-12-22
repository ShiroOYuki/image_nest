'use clinet'

import SmallWeatherCard from "../components/Cards/SmallWeatherCard/SmallWeatherCard";
import CalenderTitle from "../components/Clocks/CalenderTitle/CalenderTitle";
import BackgroundContainer from "../components/Containers/BackgroundContainer/BackgroundContainer";

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
        </BackgroundContainer>
    )
}