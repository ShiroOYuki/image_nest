import { basicWeather } from "@/app/utils/typesAndInterfaces";

export default function weatherCategoryFactory(code: number): basicWeather {
    const categories: {[key in basicWeather]: number[]} = {
        clear: [1000],
        cloudy: [1003, 1006, 1009, 1030, 1135, 1147],
        rain: [1063, 1150, 1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246, 1273, 1276],
        snow: [1066, 1114, 1117, 1069, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264, 1279, 1282],
        unknown: []
    };
    
    for (const [category, codes] of Object.entries(categories)) {
        if (codes.includes(Number(code))) {
            return category as basicWeather;
        }
    }

    return "unknown" as basicWeather;
}
  