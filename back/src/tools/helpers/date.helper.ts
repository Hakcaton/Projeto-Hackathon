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

export function DateToString(date: Date, format: string = 'dd/mm/yyyy'): string {
    let formattedDate: string = format;

    formattedDate = formattedDate.replace('dd', ('00' + (date.getDate()).toString()).slice(-2));
    formattedDate = formattedDate.replace('mm', ('00' + (date.getMonth() + 1).toString()).slice(-2));
    formattedDate = formattedDate.replace('yyyy', ('0000' + (date.getFullYear()).toString()).slice(-4));

    return formattedDate;
}

export function diffDays(dateA: Date, dateB: Date): number {
    var diff = Math.abs(dateA.getTime() - dateB.getTime());
    return Math.ceil(diff / (1000 * 3600 * 24)); 
}