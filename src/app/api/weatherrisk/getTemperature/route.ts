import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const URL = "https://premium-weather-api.weatherrisk.com/USER1/72hr-model-forecast";

    try {
        const { searchParams } = request.nextUrl;
        const locationName = searchParams.get("locationName");
        if (!locationName) {
            console.error("[Server] Location name not found!")
            return NextResponse.json({error: 'Column \'LocationName\' required.'}, { status: 500 });
        }

        const headers = {
            "Content-Type": "application/json"
        };
        const fullURL = `${URL}/${encodeURIComponent(locationName)}`;
        const resp = await fetch(fullURL, { headers: headers });
    
        if (!resp.ok) throw new Error(`[Server] Fetching Error: ${fullURL}`);
    
        const data = await resp.json();
        return NextResponse.json(data.data);
    }
    catch (e: any) {
        console.error(`[Server] Error: ${e}`);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}