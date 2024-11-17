export const colorCode = {
    red: "#D0104C",
    green: "#90B44B",
    blue: "#58B2DC",
    white: "#FFFFFF"
};

export type Colors = keyof typeof colorCode;

export interface PlotGraphProps {
    data: number[];
    padding?: number;
    color?: Colors;
}