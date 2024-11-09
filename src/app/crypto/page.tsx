'use client'
import { createElement, Dispatch, SetStateAction, useEffect, useState } from "react"
import { extractPrice, makeTexts } from "@/app/utils/cryptoHelper";


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


function makeGraph(
    prices: number[],
    height: number,
    width: number,
    padding: number = 0
) {
    let points = ""
    const max = Math.max(...prices);
    for (let i=0; i < prices.length; i++) {
        const y = prices[i] / max * (height - padding*2) + padding;
        const x = width / (prices.length-1) * i;

        console.log(`${x},${y}`)
        points += `${x},${y} `;
    }
    const linearGradient = createElement("linearGradient", {
        id: "blue-gradient",
        x1: "0",
        y1: "0",
        x2: "0",
        y2: "1",
        key: "graph_gradient",
        children: [
            createElement("stop", {
                offset: "0%",
                stopColor: "blue",
                stopOpacity: "0.5",
                key: "graph_gradient_from"
            }),
            createElement("stop", {
                offset: "100%",
                stopColor: "blue",
                stopOpacity: "0",
                key: "graph_gradient_to"
            })
        ]
    });
    const defs = createElement("defs", {
        key: "fill_def",
        children: linearGradient
    });
    const polygon = createElement("polygon", {
        points: points + `${width},${height} ${0},${height}`,
        fill: "url(#blue-gradient)",
        key: "graph_fill"
    });
    const polyline = createElement(
        "polyline",
        {
            points: points,
            stroke: "blue",
            strokeWidth: "2",
            fill: "none",
            key: "graph_line"
        }
    );
    const svg = createElement("svg", {
        width: width,
        height: height,
        xmlns: "http://www.w3.org/2000/svg",
        children: [defs, polygon, polyline]
    });
    return svg;
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
    const svg = makeGraph(prices, 400, 600, 100);

    return svg;
}