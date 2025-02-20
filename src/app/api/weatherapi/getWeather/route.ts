import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const URL = "http://api.weatherapi.com/v1/forecast.json";
    const apiKey = process.env.WEATHERAPI_API_KEY;
    if (!apiKey) {
        console.error("[Server] Api key is missing.");
        return NextResponse.json({ error: "Api key is missing." }, { status: 500 });
    }

    const { searchParams } = request.nextUrl;
    const coordinate = searchParams.get("coordinate");
    const days = searchParams.get("days");

    if (!coordinate) {
        console.error("[Server] Column 'coordinate' is missing.");
        return NextResponse.json({ error: "Column 'coordinate' is missing." }, { status: 500 });
    }

    if (!days) {
        console.error("[Server] Column 'days' is missing.");
        return NextResponse.json({ error: "Column 'days' is missing." }, { status: 500 });
    }

    try {
        const headers = {
            "Content-Type": "application/json"
        };
        const payload = new URLSearchParams({
            key: apiKey,
            q: coordinate,
            days: days,
            lang: "zh_tw"
        });

        const resp = await fetch(`${URL}?${payload}`, { headers: headers });
        
        if (!resp.ok) {
            console.error(`[Server] Fetching Error: ${URL}?${payload}`);
            return NextResponse.json({ error: "Failed to fetch weather data." }, { status: resp.status });
        }
        
        const data = await resp.json();
        return NextResponse.json(data);
    }
    catch (e: unknown) {
        if (e instanceof Error) {
            console.error(`[Server] Error: ${e.message}`);
            return NextResponse.json({ error: e.message }, { status: 500 });
        }
        else {
            return NextResponse.json({ error: "Unknown error." }, { status: 500 });
        }
    }
}