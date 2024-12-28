import { colorCode, Colors } from "../PlotVariables";

interface LinearGradientProps {
    gradientId: string;
    color: Colors;
    reversed?: boolean;
}

export function LinearGradient({
    gradientId,
    color="red",
    reversed=false
}: LinearGradientProps) {
    return reversed? (
        <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colorCode[color]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={colorCode[color]} stopOpacity="0" />
            </linearGradient>
        </defs>
    ):
    (
        <defs>
            <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor={colorCode[color]} stopOpacity="0.3" />
                <stop offset="100%" stopColor={colorCode[color]} stopOpacity="0" />
            </linearGradient>
        </defs>
    );
}