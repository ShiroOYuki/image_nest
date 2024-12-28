import { calcPoints } from "@/app/utils/svgTools";
import { colorCode, PlotGraphProps } from "../PlotVariables";

interface PlotLineProps extends PlotGraphProps {
    upperBound?: number;
    lowerBound?: number;
}

export default function PlotLine({
    data,
    padding=0,
    color="red",
    upperBound,
    lowerBound
}: PlotLineProps) {
    const points = calcPoints(data, padding, upperBound, lowerBound);
    return (
        <polyline 
            points={points} 
            stroke={colorCode[color]}
            strokeWidth="1"
            fill="none"
            vectorEffect="non-scaling-stroke"   // 在縮放的同時保持原本的線寬
        />
    )
}