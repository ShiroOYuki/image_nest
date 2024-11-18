'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlotGraphProps } from "../PlotVariables";
import PlotGraph from "../PlotGraph/PlotGraph";
import { weatherDataFactory } from "@/app/utils/weatherPlotHelper";
import { DataFeature, WeatherriskApiDataProps, WeatherriskApiRequestProps } from "@/app/utils/interfaces/api/weatherrisk";

async function fetchData(
    setData: Dispatch<SetStateAction<number[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setIsError: Dispatch<SetStateAction<boolean>>,
    props: WeatherriskApiRequestProps,
    feature: DataFeature
) {
    try {
        const payload = new URLSearchParams(Object.entries(props));
        const resp = await fetch(`/api/weatherrisk/getTemperature?${payload}`, {method: "GET"});

        if (!resp.ok) throw new Error("Fetching data error.");
        const data: WeatherriskApiDataProps[] = await resp.json();
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

interface WeatherPlotProps extends DefaultPlotProps {
    locationName: string;
    feature?: DataFeature;
};

export function WeatherPlotGraph({
    locationName,
    padding=10,
    color="red",
    feature="temperature"
}: WeatherPlotProps) {
    const [data, setData] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        fetchData(
            setData, 
            setLoading, 
            setIsError, 
            { locationName: locationName },
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