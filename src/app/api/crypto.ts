export async function fetchCryptoData() {
    const apiKey = process.env.CMC_API_KEY;
    if (!apiKey) throw new Error("CMC_API_KEY is undefined. Please set it in the environment variables.");

    try {
        const URL = 'https://sandbox-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
        const headers = {
            'X-CMC_PRO_API_KEY': apiKey,
            'Content-Type': 'application/json'
        };
        const params = {};
        
        const resp = await fetch(`${URL}?${params}`, {
            headers: headers,
        });
        if (!resp.ok) throw new Error("Fetching ctypto data error.");
        
        const data = await resp.json();
        return data.data;
    }
    catch (e) {
        console.error(e);
    }
}