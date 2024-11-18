export interface WeatherriskApiDataProps {
    forecast_time: {
        end: string;
        start: string;
    },
    issue_time: string;
    pop: number;
    tempture: number;
    weather_condition: string;
}

export interface WeatherriskApiResponseProps {
    data: WeatherriskApiDataProps[];
}

export interface WeatherriskApiRequestProps {
    locationName: string;
}

export type DataFeature = "temperature" | "chanceOfRain";