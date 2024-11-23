import { Coordinate } from "./interfaces/api/weatherapi";

export function getLocation(): Coordinate {
    let coordinate: Coordinate = [22.633, 120.35];
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