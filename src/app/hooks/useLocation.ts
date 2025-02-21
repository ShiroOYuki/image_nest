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
        timeout: 5000,
        maximumAge: 0,
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                setCoord([coords.latitude, coords.longitude]);
                setLoading(false);
            },
            () => {
                setLoading(false);
                setError(true);
            },
            options
        )
    }, []);

    return [coord, loading, error];
}