import { Coordinate, Forecast } from "@/app/utils/interfaces/api/weatherapi";


export async function fetchData(
    coordinate: Coordinate,
    days: number
) {
    if (!coordinate) throw new Error("'coordinate' is required.");
    if (typeof days !== "number") throw new Error ("'days' must be a number.");

    try {
        const payload = new URLSearchParams({
            coordinate: `${coordinate[0]},${coordinate[1]}`,
            days: days.toString()
        });

        const resp = await fetch(`/api/weatherapi/getWeather?${payload}`, {method: "GET"});

        if (!resp.ok) throw new Error("Fetching data error.");
        
        const data: Forecast = await resp.json();
        return data;
    }
    catch (e: unknown) {
        if (e instanceof Error) throw e;
        else throw new Error(String(e));
    }
}