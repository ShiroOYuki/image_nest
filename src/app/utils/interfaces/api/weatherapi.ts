/* Api Response */

interface Condition {
    text: string;
    [conditionKey: string]: any;
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
    [key: string]: any;
}

export interface Current {
    last_updated: string;
    temp_c: number;
    condition: Condition;
    precip_mm: number;
    feelslike_c: number;
    [key: string]: any;
}

export interface ForecastDayAnalysis {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    totalprecip_mm: number;
    daily_chance_of_rain: number;
    condition: Condition;
    [key: string]: any;
}

export interface ForecastHour {
    time: string;
    temp_c: number;
    condition: Condition;
    precip_mm: number;
    feelslike_c: number;
    chance_of_rain: number;
    [key: string]: any;
}

export interface ForecastDay {
    date: string;
    day: ForecastDayAnalysis;
    hour: ForecastHour[];
    [key: string]: any;
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
    "currentChanceOfRain"
);