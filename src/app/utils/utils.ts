'use client'

import { Coordinate } from "./interfaces/api/weatherapi";

export const defaultCoord: Coordinate = [22.633, 120.35];

function fetchLocation(): Coordinate {
    let coordinate: Coordinate = defaultCoord;
    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };
      
    function success(pos: GeolocationPosition) {
        const crd = pos.coords;
        coordinate = [crd.latitude, crd.longitude];
    }
    
    function error() {
        console.warn("Get location failed. Use default coordinate: [22.633, 120.35]");
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
    return coordinate;
}

export async function getLocation() {
    const coord = await fetchLocation();
    return coord;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
}