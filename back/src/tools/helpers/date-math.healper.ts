export function removeHours(date: Date): Date {
    return new Date(date.setHours(0, 0, 0, 0));
}
export function addDays(date: Date, days: number = 1): Date {
    return new Date(date.setDate(date.getDate() + days));
}
export function addWeeks(date: Date, weeks: number = 1): Date {
    return new Date(date.setDate(date.getDate() + weeks * 7));
}
export function addMonths(date: Date, months: number = 1): Date {
    return new Date(date.setMonth(date.getMonth() + months));
}
export function addYears(date: Date, years: number = 1): Date {
    return new Date(date.setFullYear(date.getFullYear() + years));
}