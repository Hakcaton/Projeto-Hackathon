import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { ContractModel } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import { clamp } from 'src/app/tools/helpers/math.helper';

@Component({
  selector: 'app-company-contracts',
  templateUrl: './company-contracts.component.html',
  styleUrls: ['./company-contracts.component.scss']
})
export class CompanyContractsComponent implements OnInit {

  private contracts: ContractModel[] = [];
  filteredContracts: ContractModel[] = [];

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
    this.filteredContracts = this.contracts.filter(contract => {
      return this.checkFilter(contract);
    });
    this.pageIndex = this.pageIndex;
  }

  constructor(private contractService: ContractService, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        this.contractService.getRegisteredContracts(params['companyCNPJ']).pipe(
          map((contracts: ContractModel[]) => {
            this.contracts = contracts;
            this.filteredContracts = this.contracts;
          })
        ).subscribe();
      })
    ).subscribe();
  }

  checkFilter(contract: ContractModel) {
    let formattedFilter = this.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[.,\-\s]/g, '');
    let formattedTitle = contract.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[.,\-\s]/g, '');

    return formattedTitle.includes(formattedFilter)
  }

  onEditClick(company: ContractModel) {

  }

  firstPage() {
    this.pageIndex = 0;
  }
  lastPage() {
    this.pageIndex = Math.floor(this.filteredContracts.length / 10)
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

  }

}
