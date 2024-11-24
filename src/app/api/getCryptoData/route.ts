import { NextResponse } from "next/server";

export interface Historical {
    id: number;
    name: string;
    quotes: {
        quote: {
            USD: {
                price: number;
            }
        };
    }[];
}

export async function GET() {
    const apiKey = process.env.CMC_API_KEY;
    const testApiKey = process.env.TEST_CMC_API_KEY

    if (!apiKey) return NextResponse.json({ error: 'API Key is missing.' }, { status: 500 });
    if (!testApiKey) return NextResponse.json({ error: 'Test API Key is missing.' }, { status: 500 });

    try {
        const URL = 'https://sandbox-api.coinmarketcap.com/v2/cryptocurrency/quotes/historical';
        const headers = {
            'X-CMC_PRO_API_KEY': testApiKey,
            'Content-Type': 'application/json'
        };
        const payload = new URLSearchParams({
            id: "1"
        });
        
        const resp = await fetch(`${URL}?${payload}`, {
            headers: headers,
        });
        
        if (!resp.ok) throw new Error("Fetching crypto data error.");
        
        const data = await resp.json();
        return NextResponse.json(data.data);
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