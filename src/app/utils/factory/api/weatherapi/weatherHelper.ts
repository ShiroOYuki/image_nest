import { Forecast, DataFeature, ForecastDay, ForecastHour } from "@/app/utils/interfaces/api/weatherapi";

export function weatherDataFactory(data: Forecast | null, feature: DataFeature): number[] | number | string[] | string | null {
    if (!data) return null;
    
    const handlers: Record<DataFeature, () => number[] | number | string[] | string> = {
        temperature: () => extractTemperature(data),
        currentTemperature: () => extractCurrTemperature(data),
        chanceOfRain: () => extractPop(data),
        currentChanceOfRain: () => extractCurrPop(data),
        dailyChanceOfRain: () => extractDailyPop(data),
        location: () => extractLocation(data),
        updateTime: () => extractUpdateTime(data)
    };

    return handlers[feature]?.() ?? null;
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