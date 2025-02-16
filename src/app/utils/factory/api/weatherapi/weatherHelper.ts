import { Forecast, ForecastHour } from "@/app/utils/interfaces/api/weatherapi";
import weatherCategoryFactory from "./weatherCategoryFactory";
import { basicWeather } from "@/app/utils/typesAndInterfaces";

type WeatherDataFeatureMap = {
    temperature: number[];
    currentTemperature: number;
    feelslike: number[];
    chanceOfRain: number[];
    currentChanceOfRain: number;
    dailyChanceOfRain: number;
    location: string[];
    updateTime: string;
    currCondText: number;
    currCategory: basicWeather;
    hourlyCategory: basicWeather[];
};

export function weatherDataFactory<K extends keyof WeatherDataFeatureMap>(
    data: Forecast, 
    feature: K
): WeatherDataFeatureMap[K] {
    const handlers: {[key in keyof WeatherDataFeatureMap]: () => WeatherDataFeatureMap[key]} = {
        temperature: () => extractTemperature(data),
        currentTemperature: () => extractCurrTemperature(data),
        feelslike: () => extractFeelslike(data),
        chanceOfRain: () => extractPop(data),
        currentChanceOfRain: () => extractCurrPop(data),
        dailyChanceOfRain: () => extractDailyPop(data),
        location: () => extractLocation(data),
        updateTime: () => extractUpdateTime(data),
        currCondText: () => extractCurrConditionText(data),
        currCategory: () => extractCurrCategory(data),
        hourlyCategory: () => extractHourlyCategory(data)
    };

    return handlers[feature]?.();
}

function extractHourlyData<K extends keyof ForecastHour>(
    data: Forecast,
    key: K
): ForecastHour[K][] {
    return data.forecast.forecastday.flatMap(day =>
        day.hour.map(hour => hour[key]).filter(value => value !== undefined)
    );
}

function extractTemperature(data: Forecast): number[] {
    return extractHourlyData(data, "temp_c");
}

function extractCurrTemperature(data: Forecast): number {
    return data.current.temp_c;
}

function extractFeelslike(data: Forecast): number[] {
    return extractHourlyData(data, "feelslike_c");
}

function extractPop(data: Forecast): number[] {
    return extractHourlyData(data, "chance_of_rain");
}

function extractCurrPop(data: Forecast): number {
    return data.current.precip_mm;
}

function extractCurrConditionText(data: Forecast): number {
    return data.current.condition.code;
}

function extractDailyPop(data: Forecast): number {
    return data.forecast.forecastday[0].day.daily_chance_of_rain;
}

function extractLocation(data: Forecast): string[] {
    return [data.location.country, data.location.name]
}

function extractUpdateTime(data: Forecast): string {
    return data.current.last_updated;
}

function extractCurrCategory(data: Forecast): basicWeather {
    const code = data.current.condition.code;
    return weatherCategoryFactory(code);
}

function extractHourlyCategory(data: Forecast): basicWeather[] {
    const cond = extractHourlyData(data, "condition");
    return cond.map((c) => {
        return weatherCategoryFactory(c.code)
    });
}