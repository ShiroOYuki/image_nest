import { NextResponse } from "next/server";

export async function GET() {
    const URL = "https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001";
    const apiKey = process.env.CWA_API_KEY;

    if (!apiKey) return NextResponse.json({error: 'API Key is missing.'}, {status: 500});

    try {
        const headers = {
            "Content-Type": "application/json"
        };
        const payload = new URLSearchParams({
            "Authorization": apiKey
        });
        const resp = await fetch(`${URL}?${payload}`, {headers: headers});

        if (!resp.ok) throw new Error(`Fetching Error: ${URL}`);

        const data = await resp.json();
        return NextResponse.json(data.data);
    }
    catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 }); 
    }
}