'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { extractPrice } from "@/app/utils/cryptoHelper";
import PlotGraph from "../components/Graph/PlotGraph/PlotGraph";
import { Historical } from "../api/getCryptoData/route";


async function fetchData(
    setData: Dispatch<SetStateAction<Historical[]>>, 
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
    } catch (e: unknown) {
        if (e instanceof Error) setError(e.message);
        else setError('An unexpected error occurred');
    } finally {
        setLoading(false);
    }
}

export default function Page() {
    const [data, setData] = useState<Historical[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        console.log("fetching");
        fetchData(setData, setLoading, setError);
    }, [])

    if (loading) return <div>Loading...</div>

    if (error) return <div>Error: {error}</div>

    if (!data) return <div>No data available.</div>;

    // const container = createElement("div", makeTexts(data));
    const prices = extractPrice(data);

    return (
        <>
            <PlotGraph data={prices} padding={10} color="red"></PlotGraph>
            <PlotGraph data={prices} padding={10} color="green"></PlotGraph>
            <PlotGraph data={prices} padding={10} color="blue"></PlotGraph>
            <PlotGraph data={prices} padding={10} color="white"></PlotGraph>
        </>
    );
}