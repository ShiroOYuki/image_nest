'use client'

import { useEffect, useState } from "react";
import { PlotGraphProps } from "../PlotVariables";
import PlotGraph from "../PlotGraph/PlotGraph";
import { DataFeature, Forecast, ForecastRequiredProps } from "@/app/utils/interfaces/api/weatherapi";
import { weatherDataFactory } from "@/app/utils/factory/api/weatherapi/weatherHelper";
import { fetchData } from "@/app/utils/factory/api/weatherapi/fetchWeather";

type DefaultPlotProps = Pick<PlotGraphProps, "color" | "padding">;

export interface WeatherPlotProps extends DefaultPlotProps, ForecastRequiredProps {
    feature?: DataFeature;
};

export function WeatherPlotGraph({
    padding=10,
    color="red",
    feature="temperature",
    days=1,
    coordinate=[22.633, 120.35]
}: WeatherPlotProps) {
    const [data, setData] = useState<Forecast | null>(null);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        fetchData(coordinate, days)
            .then((data: Forecast) => {
                setData(data);
            })
            .catch(() => {
                setIsError(true);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (isError || !data) return <p>Error</p>;

    const processedData = weatherDataFactory(data, feature) as number[];


    return <PlotGraph 
        data={processedData}
        padding={padding}
        color={color}
    />
}