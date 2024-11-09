import { createElement } from "react";
import { Historical } from "@/app/api/getCryptoData/route";

export function makeTexts(data: Historical[]) {
    const texts = [];
    for (const item of data) {
        if (!item.quotes) continue
        
        for (const key in item.quotes) {
            const price = item.quotes[key].quote.USD.price;
            texts.push(createElement("p", {
                key: `${item.name}_${key}`,
                children: price
            }));
        }
    } 
    return texts;
}


export function extractPrice(data: Historical[]) {
    const prices = [];
    for (const item of data) {
        if (!item.quotes) continue
        
        for (const key in item.quotes) {
            const price = item.quotes[key].quote.USD.price;
            prices.push(price);
        }
    } 
    return prices;
}