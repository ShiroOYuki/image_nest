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

export function weatherDataFactory(data: ApiResponse) {
    const records = data.records.location[0].weatherElement;

    interface ResultProps {
        name: string | null;
        color: string | null;
        data: number[] | null;
    };

    const result: ResultProps = {
        name: null,
        color: null,
        data: null
    };
    
    for (const record of records) {

        switch (record) {
            case "MinT":
                result.color = "blue";
                result.data = extractData(weatherElement);
                break;
            case "MaxT":
                result.color = "red";
                result.data = extractData(weatherElement);
                break;
            case "Pop":
                result.color = "blue";
                result.data = extractData(weatherElement);
                break;
            default:
                break;
        }
    }
    return result;
}