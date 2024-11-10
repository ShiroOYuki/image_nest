'use client'
import { createElement, Dispatch, SetStateAction, useEffect, useState } from "react"
import { extractPrice, makeTexts } from "@/app/utils/cryptoHelper";
import PlotGraph from "../components/Graph/PlotGraph/PlotGraph";


async function fetchData(
    setData: Dispatch<SetStateAction<any>>, 
    setLoading: Dispatch<SetStateAction<boolean>>, 
    setError: Dispatch<SetStateAction<string | null>>
) {
    try {
        const resp = await fetch("/api/getCryptoData", {method: 'GET'});
        if (!resp.ok) {
            throw new Error("Failed to fetch crypto data");
        }
        const data = await resp.json();
        setData(Object.values(data));
    } catch (e: any) {
        setError(e.message);
    } finally {
        setLoading(false);
    }
}

export default function Page() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("fetching");
        fetchData(setData, setLoading, setError);
    }, [])

    if (loading) return <div>Loading...</div>

    if (error) return <div>Error: {error}</div>

    if (!data) return <div>No data available.</div>;

    const container = createElement("div", {children: makeTexts(data)});
    const prices = extractPrice(data);

    return <PlotGraph prices={prices} padding={10}></PlotGraph>;
}