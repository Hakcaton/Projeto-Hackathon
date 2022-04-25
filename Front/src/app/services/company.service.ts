import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CompanyModel } from '../models/company.model';
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

  public registerCompany(company: CreateCompanyModel): Observable<any> {
    const url = 'api/companies';
    const headers = new HttpHeaders().set('content-type', 'application/json');
    return this.http.post(url, company, { headers: headers });
  }
}
