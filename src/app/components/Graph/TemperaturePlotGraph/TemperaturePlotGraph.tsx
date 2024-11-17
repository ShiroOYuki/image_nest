'use client'

import { useEffect } from "react";
import { PlotGraphProps } from "../PlotVariables";

async function fetchData() {
    try {
        const resp = await fetch("/api/cwa/getTemperature", {method: "GET"});
        console.log(resp);
        if (!resp.ok) throw new Error("Fetching data error.");
        const data = await resp.json();
        return data;
    }
    catch (e: any) {
        console.log(e.message);
    }
}

type TemperaturePlotProp = Pick<PlotGraphProps, "color" | "padding">;

export default function TemperaturePlotGraph({
    padding=10,
    color="red"
}: TemperaturePlotProp) {
    useEffect(() => {
        fetchData();
    }, []);
    return <></>
}