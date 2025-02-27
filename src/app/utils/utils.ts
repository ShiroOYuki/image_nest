'use client'

export function clamp(value: number, min: number, max: number): number {
    return Math.max(Math.min(value, max), min);
}

export function isDigit(str: string) {
    return /^[0-9]*$/.test(str);
}