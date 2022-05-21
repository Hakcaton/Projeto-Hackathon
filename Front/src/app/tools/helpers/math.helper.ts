export function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export function zerosLeft(value: number, count: number) {
    return String(value).padStart(count, '0');
}