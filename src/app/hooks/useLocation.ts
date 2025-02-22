'use client'

import { useEffect, useState } from "react";
import { Coordinate } from "../utils/interfaces/api/weatherapi";

export const defaultCoord: Coordinate = [0, 0];

export function useLocation(defaultLocation: Coordinate = defaultCoord): [Coordinate, boolean, boolean] {
    const [coord, setCoord] = useState<Coordinate>(defaultLocation);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const options = {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                setCoord([coords.latitude, coords.longitude]);
                setLoading(false);
            },
            (e: unknown) => {
                setLoading(false);
                setError(true);
                console.log("Fetching location error.");
                if (e instanceof Error) console.log(e.message);
                else console.log(e);
            },
            options
        )
    }, []);

    return [coord, loading, error];
}