import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class DateHelper {
    constructor(private http: HttpClient) { }

    DateToString(date: Date, format: string = 'dd/mm/yyyy'): string {
        // console.log(typeof date);

        let formattedDate: string = format;

        formattedDate = formattedDate.replace('dd', ('00' + (date.getDate()).toString()).slice(-2));
        formattedDate = formattedDate.replace('mm', ('00' + (date.getMonth() + 1).toString()).slice(-2));
        formattedDate = formattedDate.replace('yyyy', ('0000' + (date.getFullYear()).toString()).slice(-4));

        return formattedDate;
    }
}
