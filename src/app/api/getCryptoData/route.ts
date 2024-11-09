import { NextResponse } from "next/server";

export interface Historical {
    id: number;
    name: string;
    quote: {
        USD: {
            price: number;
            [key: string]: any;
        }
    };
    [key: string]: any;
}

export async function GET() {
    const apiKey = process.env.CMC_API_KEY;
    const testApiKey = process.env.TEST_CMC_API_KEY

    if (!apiKey) return NextResponse.json({ error: 'API Key is missing' }, { status: 500 });
    if (!testApiKey) return NextResponse.json({ error: 'Test API Key is missing' }, { status: 500 });

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
    catch (e: any) {
        console.error(e);
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}