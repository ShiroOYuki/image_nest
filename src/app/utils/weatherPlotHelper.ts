interface ElementProps {
    startTime: string;
    endTime: string;
    parameter: {
        parameterName: string;
        parameterUnit: string;
    };
};

interface WeatherElementProps {
    elementName: string;
    time: ElementProps[];
}

interface ApiResponse {
    [key: string]: any;
    records: {
        [key: string]: any;
        location: {
            locationName: string;
            weatherElement: WeatherElementProps[]
        }[];
    }
};

function extractData(data: WeatherElementProps): number[] {
    const element = data.time;
    const res = element.reduce((prev, curr) => {
        prev.push(parseFloat(curr.parameter.parameterName));
        return prev;
    }, [] as number[]);
    return res;
}

interface ResultProps {
    name: string;
    color: string;
    data: number[];
};

export function weatherDataFactory(data: ApiResponse): ResultProps[] {
    const records = data.records.location[0].weatherElement;

    const results: ResultProps[] = records.reduce((prev, curr) => {
        const result: ResultProps = {
            name: curr.elementName,
            color: "white",
            data: []
        }
        switch (curr.elementName) {
            case "MinT":
                result.color = "blue";
                result.data = extractData(curr);
                break;
            case "MaxT":
                result.color = "red";
                result.data = extractData(curr);
                break;
            case "Pop":
                result.color = "blue";
                result.data = extractData(curr);
                break;
            default:
                break;
        }
        prev.push(result);
        return prev;
    }, [] as ResultProps[]);

    return results;
}