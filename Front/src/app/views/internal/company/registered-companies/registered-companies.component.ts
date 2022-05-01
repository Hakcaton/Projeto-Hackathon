import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { CompanyModel } from 'src/app/models/company.model';
import { CompanyService } from 'src/app/services/company.service';
import { clamp } from 'src/app/tools/helpers/math.helper';

@Component({
  selector: 'app-registered-companies',
  templateUrl: './registered-companies.component.html',
  styleUrls: ['./registered-companies.component.scss'],
})
export class RegisteredCompaniesComponent {
  private companies: CompanyModel[] = [];
  filteredCompanies: CompanyModel[] = [];

  private _pageIndex: number = 0;
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value: number) {
    const totalPages = Math.floor((this.filteredCompanies.length - 1) / 10);
    this._pageIndex = clamp(value, 0, totalPages > 0 ? totalPages : 0);
  }

  private _filter: string = '';
  get filter() {
    return this._filter;
  }
  set filter(value: string) {
    this._filter = value;
    this.filteredCompanies = this.companies.filter((company) => {
      return this.checkFilter(company);
    });
    this.pageIndex = this.pageIndex;
  }

  constructor(private companyService: CompanyService, private router: Router) {
    this.companyService
      .getRegisteredCompanies()
      .pipe(
        map((companies: CompanyModel[]) => {
          this.companies = companies;
          this.filteredCompanies = this.companies;
        })
      ).subscribe();
  }

  checkFilter(company: CompanyModel) {
    let formattedFilter = this.filter
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedCorporateName = company.corporateName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedCNPJ = company.cnpj
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedStateRegistration = company.stateRegistration
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');

    return (
      formattedCorporateName.includes(formattedFilter) ||
      formattedCNPJ.includes(formattedFilter) ||
      formattedStateRegistration.includes(formattedFilter)
    );
  }

  onEditClick(company: CompanyModel) { 
    this.router.navigateByUrl('/interno/empresas/' + company.cnpj.replace('/', '%2F'));
  }
  onContractsClick(company: CompanyModel) {
    this.router.navigateByUrl('/interno/empresas/' + company.cnpj.replace('/', '%2F') + '/contratos');
  }

  firstPage() {
    this.pageIndex = 0;
  }
  lastPage() {
    this.pageIndex = Math.floor(this.filteredCompanies.length / 10);
  }
  previousPage() {
    this.pageIndex--;
  }
  nextPage() {
    this.pageIndex++;
  }

  clearFilter() {
    this.filter = '';
  }
}
