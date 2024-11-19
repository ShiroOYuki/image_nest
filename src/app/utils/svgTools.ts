export function calcPoints(data: number[], padding:number) {
    if (data.length === 0) return ""; // 處理空數據
    if (data.length === 1) return `0,${100 - padding} 100,${100 - padding} `; // 單點情況

    const dataMin = Math.min(...data);
    const dataMax = Math.max(...data);
    const normalizedMax = Math.max(dataMax - dataMin, 1); // 避免除以零
    const scale = (100 - padding * 2) / normalizedMax;
    
    let points = "";
    for (let i=0; i < data.length; i++) {
        const y = (data[i] - dataMin) * scale + padding;
        const x = 100 / (data.length-1) * i;
        points += `${x},${100-y} `;
    }
    return points;
}