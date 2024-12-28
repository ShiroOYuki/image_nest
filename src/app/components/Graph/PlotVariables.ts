export const colorCode = {
    red: "#D0104C",
    green: "#86C166",
    blue: "#7AB2D3",
    white: "#FAF7F0"
};

export type Colors = keyof typeof colorCode;

export interface PlotGraphProps {
    data: number[];
    padding?: number;
    color?: Colors;
}