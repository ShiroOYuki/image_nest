/* Api Response */

interface Condition {
    text: string;
    code: number;
}

export interface Location {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
}

export interface Current {
    chance_of_rain: number;
    last_updated: string;
    temp_c: number;
    condition: Condition;
    precip_mm: number;
    feelslike_c: number;
}

export interface ForecastDayAnalysis {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    totalprecip_mm: number;
    daily_chance_of_rain: number;
    condition: Condition;
}

export interface ForecastHour {
    chance_of_rain: number;
    time: string;
    temp_c: number;
    condition: Condition;
    precip_mm: number;
    feelslike_c: number;
}

export interface ForecastDay {
    date: string;
    day: ForecastDayAnalysis;
    hour: ForecastHour[];
}

export interface Forecast {
    location: Location;
    current: Current;
    forecast: {
        forecastday: ForecastDay[];
    }
}

/* Route Required */

export type Coordinate = [lat: number, lon: number];

export interface ForecastRequiredProps {
    coordinate: Coordinate;
    days: number;
}

export type DataFeature = (
    "temperature" | 
    "currentTemperature" | 
    "chanceOfRain" | 
    "currentChanceOfRain" |
    "dailyChanceOfRain" |
    "location" |
    "updateTime"
);