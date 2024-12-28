export function calcPoints(
    data: number[], 
    padding?: number,
    upperBound?: number,
    lowerBound?: number
) {
    if (typeof padding === "undefined") padding = 0;
    if (typeof upperBound === "undefined") upperBound = Math.max(...data);
    if (typeof lowerBound === "undefined") lowerBound = Math.min(...data);
    if (data.length === 0) return ""; // 處理空數據
    if (data.length === 1) return `0,${100 - padding} 100,${100 - padding} `; // 單點情況

    const normalizedMax = Math.max(upperBound - lowerBound, 1); // 避免除以零
    const scale = (100 - padding * 2) / normalizedMax;
    
    let points = "";
    for (let i=0; i < data.length; i++) {
        const y = (data[i] - lowerBound) * scale + padding;
        const x = 100 / (data.length-1) * i;
        points += `${x},${100-y} `;
    }
    return points;
}