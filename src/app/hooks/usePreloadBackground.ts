'use client'

import { useEffect } from "react"

function preloadImage(url: string) {
    const img = new Image();
    img.src = url;
}

export default function usePreloadBackground(imgUrl: string[]) {
    useEffect(() => {
        imgUrl.forEach((v: string) => {
            preloadImage(v);
        })
    }, []);
}