'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { PlotGraphProps } from "../PlotVariables";
import PlotGraph from "../PlotGraph/PlotGraph";
import { weatherDataFactory } from "@/app/utils/weatherPlotHelper";

interface ApiProps {
    locationName?: string;
    elementName?: string;
    timeFrom?: string;
    timeTo?: string;
}

async function fetchData(
    setData: Dispatch<SetStateAction<number[]>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    setIsError: Dispatch<SetStateAction<boolean>>,
    props: ApiProps
) {
    try {
        const payload = new URLSearchParams(props as Record<string, string>);
        const resp = await fetch(`/api/cwa/getTemperature?${payload}`, {method: "GET"});

        if (!resp.ok) throw new Error("Fetching data error.");
        const data = await resp.json();
        const processedData = weatherDataFactory(data);
        console.log(data);
        console.log(processedData);

        setData(processedData[0].data);
        setLoading(false);
    }
    catch (e: any) {
        console.log(e.message);
        setIsError(true);
    }
}

type DefaultPlotProps = Pick<PlotGraphProps, "color" | "padding">;

interface WeatherPlotProps extends DefaultPlotProps, ApiProps {};

interface FactoryProps extends 
    DefaultPlotProps, 
    Pick<ApiProps, "locationName" | "timeFrom" | "timeTo"> {
    feature: "temperature" | "chanceOfRain";
};

export function WeatherPlotFactory ({
    padding=10,
    color="red",
    locationName="",
    timeFrom="",
    timeTo="",
    feature="temperature"
}: FactoryProps) {
    switch (feature) {
        case "temperature":
            return <WeatherPlotGraph
                padding={padding}
                color={color} 
                locationName={locationName}
                timeFrom={timeFrom}
                timeTo={timeTo}
                elementName="MinT,MaxT"
            />
        case "chanceOfRain":
            return <WeatherPlotGraph
                padding={padding}
                color={color} 
                locationName={locationName}
                timeFrom={timeFrom}
                timeTo={timeTo}
                elementName="Pop"
            />
        default:
            return <></>
    }
}

export function WeatherPlotGraph({
    padding=10,
    color="red",
    locationName="",
    elementName="",
    timeFrom="",
    timeTo=""
}: WeatherPlotProps) {
    const [data, setData] = useState<number[]>([]);
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    useEffect(() => {
        fetchData(
            setData, 
            setLoading, 
            setIsError, 
            {locationName, elementName, timeFrom, timeTo}
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