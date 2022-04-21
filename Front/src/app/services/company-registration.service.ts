import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CompanyModel } from '../models/company.model';

@Injectable({
  providedIn: 'root',
})
export class CompanyRegistrationService {
  constructor(private http: HttpClient) {}

  registerCompanyData(companyData: CompanyModel) {
    let url = '/api/company/register/company';
    return this.http.post(url, companyData).pipe(
      map((res: any) => {
      })
    );
  }
}
