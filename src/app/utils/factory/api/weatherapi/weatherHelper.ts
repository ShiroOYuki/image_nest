import { Forecast, DataFeature, ForecastDay, ForecastHour } from "@/app/utils/interfaces/api/weatherapi";

export function weatherDataFactory(data: Forecast, feature: DataFeature): number[] {
    switch (feature) {
        case "temperature":
            return extractTemperature(data);
        case "currentTemperature":
            return extractCurrTemperature(data);
        case "chanceOfRain":
            return extractPop(data);
        case "currentChanceOfRain":
            return extractCurrPop(data);
        default: 
            return [];
    }
}

function extractTemperature(data: Forecast) {
    const days = data.forecast.forecastday;
    const res = days.reduce((prev, curr) => {
        curr.hour.forEach(hour => {
            prev.push(hour.temp_c);
        });
        return prev;
    }, [] as number[]);
    return res;
}

function extractCurrTemperature(data: Forecast) {
    return [data.current.temp_c];
}

function extractPop(data: Forecast) {
    const days = data.forecast.forecastday;
    const res = days.reduce((prev, curr) => {
        curr.hour.map((hour) => {
            prev.push(hour.precip_mm);
        })
        return prev;
    }, [] as number[]);
    return res;
}

function extractCurrPop(data: Forecast) {
    return [data.current.precip_mm];
}