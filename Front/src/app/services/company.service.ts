import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddContractModel } from '../models/add-contract.model';
import { CompanyModel } from '../models/company.model';
import { ContractModel } from '../models/contract.model';
import { CreateCompanyModel } from '../models/create-company.model';
import { GetCompanyModel } from '../models/get-company.model';
import { UpdateCompanyModel } from '../models/update-company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) { }

  getRegisteredCompanies(): Observable<any> {
    const url = 'api/companies';
    return this.http.get(url);
  }

  getCompany(companyCNPJ: string): Observable<GetCompanyModel> {
    const url = 'api/companies/' + companyCNPJ.replace('/', '%2F');
    return this.http.get<GetCompanyModel>(url);
  }

  registerCompany(company: CreateCompanyModel): Observable<any> {
    const url = 'api/companies';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(url, company, { headers: headers });
  }

  registerContract(contract: AddContractModel, companyCNPJ: string): Observable<ContractModel> {
    const url = '/api/companies/' + companyCNPJ.replace('/', '%2F') + '/contracts';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post<ContractModel>(url, contract, { headers: headers });
  }

  updateCompany(companyCNPJ: string, company: UpdateCompanyModel): Observable<GetCompanyModel> {
    const url = '/api/companies/' + companyCNPJ.replace('/', '%2F');
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.patch<GetCompanyModel>(url, company, { headers: headers });
  }
}
