import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, throwError } from 'rxjs';
import { CompanyModel } from 'src/app/models/company.model';
import { ContractModel } from 'src/app/models/contract.model';
import { CompanyService } from 'src/app/services/company.service';
import { ContractService } from 'src/app/services/contract.service';
import { DateHelper } from 'src/app/tools/helpers/date.helper';
import { clamp } from 'src/app/tools/helpers/math.helper';

@Component({
  selector: 'app-company-contracts',
  templateUrl: './company-contracts.component.html',
  styleUrls: ['./company-contracts.component.scss'],
})
export class CompanyContractsComponent implements OnInit {
  companyData: CompanyModel = <CompanyModel>{};

  private contracts: ContractModel[] = [];
  filteredContracts: ContractModel[] = [];
  companyCnpj: string = '';
  bAddContract: boolean = false;

  private _pageIndex: number = 0;
  get pageIndex() {
    return this._pageIndex;
  }
  set pageIndex(value: number) {
    const totalPages = Math.floor((this.filteredContracts.length - 1) / 10);
    this._pageIndex = clamp(value, 0, totalPages > 0 ? totalPages : 0);
  }

  private _filter: string = '';
  get filter() {
    return this._filter;
  }
  set filter(value: string) {
    this._filter = value;
    this.filteredContracts = this.contracts.filter((contract) => {
      return this.checkFilter(contract);
    });
    this.pageIndex = this.pageIndex;
  }

  constructor(
    private contractService: ContractService,
    private companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,
    public dateHelper: DateHelper,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          this.companyData.cnpj = params['companyCNPJ'];

          this.companyService
            .getCompany(this.companyData.cnpj)
            .pipe(
              map((company) => {
                this.companyData = company;
              }),
              catchError((err)=>{
                this.toastr.error('Não foi possível obter os contratos da empresa');
                this.router.navigateByUrl('/interno/empresas');
                return throwError(()=>err);
              })
            )
            .subscribe();

          this.contractService
            .getContracts(this.companyData.cnpj)
            .pipe(
              map((contracts) => {
                contracts.forEach((contract) => {
                  contract.initialDate = new Date(contract.initialDate);
                  if (contract.finalDate) {
                    contract.finalDate = new Date(contract.finalDate);
                  }
                });

                this.contracts = contracts;
                this.filteredContracts = this.contracts;
              }),
              catchError((err)=>{
                this.toastr.error('Não foi possível obter os contratos da empresa');
                this.router.navigateByUrl('/interno/empresas');
                return throwError(()=>err);
              })
            )
            .subscribe();
        })
      )
      .subscribe();
  }

  checkFilter(contract: ContractModel) {
    let formattedFilter = this.filter
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');
    let formattedTitle = contract.title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[.,\-\s]/g, '');

    return formattedTitle.includes(formattedFilter);
  }

  onEditClick(contract: ContractModel) {
    this.router.navigateByUrl('/interno/contratos/' + contract.id);
  }

  onViewFormFieldsClick(contract: ContractModel) {
    this.router.navigateByUrl(
      '/interno/contratos/' + contract.id + '/formulario'
    );
  }

  onValidateDocumentsClick(contract: ContractModel) {
    this.router.navigateByUrl(
      '/interno/contratos/' + contract.id + '/validar-documentos'
    );
  }

  firstPage() {
    this.pageIndex = 0;
  }
  lastPage() {
    this.pageIndex = Math.floor(this.filteredContracts.length / 10);
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

  btnAddContractClick() {
    this.bAddContract = true;
  }

  onContractAdded(contracts: ContractModel) {
    this.bAddContract = false;
    this.contracts.push(contracts);
    this.filter = this.filter;
  }

  onContractCancel() {
    this.bAddContract = false;
  }
}
