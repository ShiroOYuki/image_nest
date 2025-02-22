import { basicWeather } from "@/app/utils/typesAndInterfaces";

export interface weatherLayoutProps {
    bgs: {[key in basicWeather]: string};
    updateTime: string;
    displayTime: string;
    location: string[];
    currTemp: number;
    hourlyTemp: number[];
    weatherCategory: basicWeather;
    hourlyCategory: basicWeather[];
    chanceOfRain: {
        chanceOfRain?: number;
        timeIndex?: number | string;
    };
    cards: JSX.Element[];
    handleHoverTemperatureChange: (data: {
        data: number;
        timeIndex: number;
    }) => void;
}