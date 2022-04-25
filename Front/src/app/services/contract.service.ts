import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContractModel } from '../models/contract.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

  constructor(private http: HttpClient) { }

  getRegisteredContracts(companyCNPJ: string): Observable<ContractModel[]> {
    const url = '/api/companies/' + companyCNPJ.replace('/', '%2F')+ '/contracts'
    return this.http.get<ContractModel[]>(url);
  }
}
