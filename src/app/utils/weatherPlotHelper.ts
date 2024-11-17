function extractData(data: any): number[] {
    return [];
}

export function weatherDataFactory(data: any) {
    const records = data["records"][0]["weatherElement"];
    const result: {
        color: string | null;
        data: number[] | null;
    } = {
        color: null,
        data: null
    };
    
    for (const record of records) {

        switch (record) {
            case "MinT":
                result.color = "blue";
                result.data = extractData(data);
                break;
            case "MaxT":
                result.color = "red";
                result.data = extractData(data);
                break;
            case "Pop":
                result.color = "blue";
                result.data = extractData(data);
                break;
            default:
                break;
        }
    }
    return result;
}