import { WeatherriskApiResponseProps } from "@/app/utils/interfaces/api/weatherrisk";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001";
    const apiKey = process.env.CWA_API_KEY;

    if (!apiKey) {
        console.error('API Key is missing.');
        return NextResponse.json({error: 'API Key is missing.'}, { status: 500 });
    }

    try {
        const { searchParams } = request.nextUrl;
        const requestParams = {
            "Authorization": apiKey,
            "locationName": searchParams.get("locationName"),
            "elementName": searchParams.get("elementName"),
            "timeFrom": searchParams.get("timeFrom"),
            "timeTo": searchParams.get("timeTo")
        };
        const filteredParams = Object.entries(requestParams)
            .filter(([key, val], idx, ary) => { return val && val != "" })
            .reduce(
                (prev, [key, val]) => {                 // callbackfn
                    if (val != null) prev[key] = val;
                    return prev;
                }, 
                {} as Record<string, string>            // initialValue
            );

        console.log(filteredParams);

        const headers = {
            "Content-Type": "application/json"
        };
        const payload = new URLSearchParams(filteredParams);
        const resp = await fetch(`${URL}?${payload}`, { headers: headers });

        if (!resp.ok) throw new Error(`[Server] Fetching Error: ${URL}`);

        const data: WeatherriskApiResponseProps = await resp.json();
        return NextResponse.json(data.data);
    }
    catch (e: any) {
        console.error(`[Server] Error: ${e}`);
        return NextResponse.json({ error: e.message }, { status: 500 }); 
    }
}