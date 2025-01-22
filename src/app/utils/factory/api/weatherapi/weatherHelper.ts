import { Forecast, DataFeature, ForecastHour } from "@/app/utils/interfaces/api/weatherapi";

type WeatherDataFeatureMap = {
    temperature: number[];
    currentTemperature: number;
    chanceOfRain: number[];
    currentChanceOfRain: number;
    dailyChanceOfRain: number;
    location: string[];
    updateTime: string;
};

export function weatherDataFactory<K extends keyof WeatherDataFeatureMap>(
    data: Forecast, 
    feature: K
): WeatherDataFeatureMap[K] {
    const handlers: {[key in keyof WeatherDataFeatureMap]: () => WeatherDataFeatureMap[key]} = {
        temperature: () => extractTemperature(data),
        currentTemperature: () => extractCurrTemperature(data),
        chanceOfRain: () => extractPop(data),
        currentChanceOfRain: () => extractCurrPop(data),
        dailyChanceOfRain: () => extractDailyPop(data),
        location: () => extractLocation(data),
        updateTime: () => extractUpdateTime(data)
    };

    return handlers[feature]?.();
}

function extractHourlyData(data: Forecast, key: keyof ForecastHour): number[] {
    return data.forecast.forecastday.reduce((prev, curr) => {
        curr.hour.forEach(hour => {
            if (hour[key] !== undefined) {
                prev.push(hour[key] as number);
            }
        });
        return prev;
    }, [] as number[]);
}

function extractTemperature(data: Forecast): number[] {
    return extractHourlyData(data, "temp_c");
}

function extractCurrTemperature(data: Forecast): number {
    return data.current.temp_c;
}

function extractPop(data: Forecast): number[] {
    return extractHourlyData(data, "chance_of_rain");
}

function extractCurrPop(data: Forecast): number {
    return data.current.chance_of_rain;
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

function extractMinMaxAvg(data: Forecast) {
    let min: number[] = [];
    let max: number[] = [];
    let avg: number[] = [];
    let date: string[] = [];
    data.forecast.forecastday.forEach((day) => {
        const eachDay = day.day;
        min.push(eachDay.mintemp_c);
        max.push(eachDay.maxtemp_c);
        avg.push(eachDay.avgtemp_c);
        date.push(day.date);
    });
    const forecastToday = data.forecast.forecastday[0];
    return {
        min: min,
        max: max,
        avg: avg,
        data: data
    }
}