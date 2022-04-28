import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddContractModel } from '../models/add-contract.model';
import { CompanyModel } from '../models/company.model';
import { ContractModel } from '../models/contract.model';
import { CreateCompanyModel } from '../models/create-company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  public getRegisteredCompanies(): Observable<any> {
    const url = 'api/companies';
    return this.http.get(url);
  }

  public getCompany(companyCNPJ: string): Observable<CompanyModel> {
    const url = 'api/companies/' + companyCNPJ.replace('/', '%2F');
    return this.http.get<CompanyModel>(url);
  }

  public registerCompany(company: CreateCompanyModel): Observable<any> {
    const url = 'api/companies';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(url, company, { headers: headers });
  }

  public registerContract(
    contract: AddContractModel,
    companyCnpj: string
  ): Observable<ContractModel> {
    const url = `/api/companies/${companyCnpj}/contracts`;
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<ContractModel>(url, contract, { headers: headers });
  }
}
