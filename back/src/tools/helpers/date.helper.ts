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

export function MonthToString(month: number, reduced: boolean = false): string {
    if (!reduced) {
        if (month == 0) return 'Janeiro';
        if (month == 1) return 'Fevereiro';
        if (month == 2) return 'Março';
        if (month == 3) return 'Abril';
        if (month == 4) return 'Maio';
        if (month == 5) return 'Junho';
        if (month == 6) return 'Julho';
        if (month == 7) return 'Agosto';
        if (month == 8) return 'Setembro';
        if (month == 9) return 'Outubro';
        if (month == 10) return 'Novembro';
        if (month == 11) return 'Dezembro';
    }
    else{
        if (month == 0) return 'Jan';
        if (month == 1) return 'Fev';
        if (month == 2) return 'Mar';
        if (month == 3) return 'Abr';
        if (month == 4) return 'Mai';
        if (month == 5) return 'Jun';
        if (month == 6) return 'Jul';
        if (month == 7) return 'Ago';
        if (month == 8) return 'Set';
        if (month == 9) return 'Out';
        if (month == 10) return 'Nov';
        if (month == 11) return 'Dez';
    }
}