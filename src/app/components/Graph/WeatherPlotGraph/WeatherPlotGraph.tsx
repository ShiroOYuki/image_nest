'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlotGraphProps } from "../PlotVariables";
import PlotGraph from "../PlotGraph/PlotGraph";
import { DataFeature, Forecast, ForecastRequiredProps } from "@/app/utils/interfaces/api/weatherapi";
import { weatherDataFactory } from "@/app/utils/factory/api/weatherapi/weatherHelper";

async function fetchData(
    setData: Dispatch<SetStateAction<number[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setIsError: Dispatch<SetStateAction<boolean>>,
    props: ForecastRequiredProps,
    feature: DataFeature
) {
    try {
        const payload = new URLSearchParams(Object.entries(props));
        const resp = await fetch(`/api/weatherapi/getWeather?${payload}`, {method: "GET"});

        if (!resp.ok) throw new Error("Fetching data error.");
        const data: Forecast = await resp.json();
        const processedData = weatherDataFactory(data, feature);
        console.log(data);
        console.log(processedData);

        setData(processedData);
        setLoading(false);
    }
    catch (e: any) {
        console.log(e.message);
        setIsError(true);
    }
}

type DefaultPlotProps = Pick<PlotGraphProps, "color" | "padding">;

interface WeatherPlotProps extends DefaultPlotProps, ForecastRequiredProps {
    feature?: DataFeature;
};

export function WeatherPlotGraph({
    padding=10,
    color="red",
    feature="temperature",
    days=1,
    coordinate=[22.633, 120.35]
}: WeatherPlotProps) {
    const [data, setData] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        fetchData(
            setData, 
            setLoading, 
            setIsError, 
            { coordinate: coordinate, days: days },
            feature=feature
        );
    }, []);

    if (loading) return <p>Loading...</p>;
    if (isError) return <p>Error</p>;

    return <PlotGraph 
        data={data}
        padding={padding}
        color={color}
    />
}