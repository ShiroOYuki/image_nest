import { Dispatch, MutableRefObject, SetStateAction } from "react";
import { Coordinate } from "@/app/utils/interfaces/api/weatherapi";

export interface HomepageLayoutProps {
    bgs: string[];
    bgId: number;
    brightness: number;
    zenMode: boolean;
    changing: boolean;
    location: Coordinate;
    timerLayoutRef: MutableRefObject<HTMLDivElement | null>;
    nowBrightness: MutableRefObject<number>;
    setBrightness: Dispatch<SetStateAction<number>>;
    weatherButton: JSX.Element;
    changeImageButton: JSX.Element;
    zenButton: JSX.Element;
    zenCanselButton: JSX.Element;
    toolsButton: JSX.Element;
    zenLayoutStyle: string;
}