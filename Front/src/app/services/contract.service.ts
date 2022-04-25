import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

  constructor(private http: HttpClient) { }

  getRegisteredContracts(companyCNPJ: string): Observable<any> {
    const url = '/api/companies/' + companyCNPJ + '/contracts'
    return this.http.get(url);
  }
}
