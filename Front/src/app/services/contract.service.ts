import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormFieldModel } from '../models/form-field.model';
import { ContractModel } from '../models/contract.model';
import { AddFormFieldModel } from '../models/add-form-field.model';

@Injectable({
  providedIn: 'root',
})
export class ContractService {

  constructor(private http: HttpClient) { }

  getContracts(companyCNPJ?: string): Observable<ContractModel[]> {
    if (companyCNPJ) {
      var url = '/api/companies/' + companyCNPJ.replace('/', '%2F') + '/contracts';
    }
    else {
      var url = '/api/companies/contracts';
    }
    return this.http.get<ContractModel[]>(url);
  }

  getContractFormFields(contractId: string): Observable<FormFieldModel[]> {
    const url = '/api/contracts/' + contractId + '/form-fields';
    return this.http.get<FormFieldModel[]>(url);
  }

  addFormField(contractId: string, formField: AddFormFieldModel): Observable<FormFieldModel> {
    const url = 'api/contracts/' + contractId + '/form-fields';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<FormFieldModel>(url, formField, { headers: headers });
  }
}

