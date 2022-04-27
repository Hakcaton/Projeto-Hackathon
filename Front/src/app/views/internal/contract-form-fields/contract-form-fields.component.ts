import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { FormFieldModel as FormFieldModel } from 'src/app/models/form-field.model';
import { ContractService } from 'src/app/services/contract.service';

@Component({
  selector: 'app-contract-form-fields',
  templateUrl: './contract-form-fields.component.html',
  styleUrls: ['./contract-form-fields.component.scss']
})
export class ContractFormFieldsComponent implements OnInit {
  contractId: string = '';
  bAddFormField: boolean = false;

  //#region generalDocumentsFilter
  private _filter: string = '';
  get filter() {
    return this._filter;
  }
  set filter(value: string) {
    this._filter = value;
    this.filteredFormFields = this.formFields.filter((document) => {
      return this.checkDocumentsFilter(document);
    });
  }
  //#endregion

  private formFields: FormFieldModel[] = [];
  filteredFormFields: FormFieldModel[] = [];

  constructor(private contractService: ContractService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => {
        this.contractId = params['contractId'];

        this.contractService.getContractFormFields(this.contractId).pipe(
          map(contractFormFields => {
            contractFormFields.forEach(formField => {
              formField.firstRequestDate = new Date(formField.firstRequestDate);
            })

            this.formFields = contractFormFields;
            this.filteredFormFields = this.formFields;
          })
        ).subscribe();
      })
    ).subscribe();
  }

  btnAddFormFieldClick() {
    this.bAddFormField = true;
  }

  clearFilter() {
    this.filter = '';
  }

  checkDocumentsFilter(formField: FormFieldModel): unknown {
    let formattedFilter = this.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,\-\s]/g, '');
    let formattedTitle = formField.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[.,\-\s]/g, '');

    return formattedTitle.includes(formattedFilter);
  }

  onFormFieldAdded(formField: FormFieldModel) {
    this.bAddFormField = false;
    this.formFields.push(formField);
    this.filteredFormFields = this.formFields;
    this.filter = this.filter;
  }

  onFormFieldCancel() {
    this.bAddFormField = false;
  }
}
