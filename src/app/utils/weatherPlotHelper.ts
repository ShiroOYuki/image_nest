import { DataFeature, WeatherriskApiDataProps } from "./interfaces/api/weatherrisk";

export function weatherDataFactory(
    data: WeatherriskApiDataProps[], 
    feature: DataFeature
): number[] {

    const featureTrans: Record<DataFeature, string> = {
        temperature: "tempture",
        chanceOfRain: "pop"
    }

    const res = data.map((item) => item[featureTrans[feature] as keyof WeatherriskApiDataProps] as number);

    return res;
}