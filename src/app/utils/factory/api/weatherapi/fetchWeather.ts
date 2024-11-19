import { DataFeature, Forecast, ForecastRequiredProps } from "@/app/utils/interfaces/api/weatherapi";
import { Dispatch, SetStateAction } from "react";
import { weatherDataFactory } from "./weatherHelper";

export async function fetchData(
    setData: Dispatch<SetStateAction<Forecast | null>>,
    setLoading: Dispatch<SetStateAction<boolean>> | null,
    setIsError: Dispatch<SetStateAction<boolean>> | null,
    props: ForecastRequiredProps
) {
    try {
        const payload = new URLSearchParams(Object.entries(props));
        const resp = await fetch(`/api/weatherapi/getWeather?${payload}`, {method: "GET"});

        if (!resp.ok) throw new Error("Fetching data error.");
        const data: Forecast = await resp.json();

        setData(data);
        if (setLoading) setLoading(false);
        
    }
    catch (e: any) {
        console.log(e.message);
        if (setLoading) setLoading(false);
        if (setIsError) setIsError(true);
    }
}