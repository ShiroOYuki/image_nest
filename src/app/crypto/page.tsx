'use client'
import { Dispatch, SetStateAction, useEffect, useState } from "react"

async function fetchData(
    setData: Dispatch<SetStateAction<any>>, 
    setLoading: Dispatch<SetStateAction<boolean>>, 
    setError: Dispatch<SetStateAction<string | null>>
) {
    try {
        const resp = await fetch("/api/getCryptoData", {method: 'GET'});
        if (!resp.ok) {
            throw new Error("Failed to fetch crypto data")
        }
        setData(await resp.json());
    } catch (e: any) {
        console.log(e);
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

    if (!data) return <div>No data available.</div>;;

    console.log(data);
    return <div>ok</div>;
}