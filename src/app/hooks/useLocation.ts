'use client'

import { useEffect, useState } from "react";
import { Coordinate } from "../utils/interfaces/api/weatherapi";
import { defaultCoord } from "../utils/utils";

export function useLocation(defaultLocation: Coordinate = defaultCoord) {
    const [coord, setCoord] = useState<Coordinate>(defaultLocation);
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            ({coords}) => {
                setCoord([coords.latitude, coords.longitude]);
            },
            () => {},
            options
        )
    }, []);

    return coord;
}