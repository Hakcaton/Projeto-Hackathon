import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { catchError, map, throwError } from 'rxjs';
import { ContractModel } from 'src/app/models/contract.model';
import { UpdateContractModel } from 'src/app/models/update-contract.model';
import { ContractService } from 'src/app/services/contract.service';
import { DateHelper } from 'src/app/tools/helpers/date.helper';

@Component({
  selector: 'app-contract-info',
  templateUrl: './contract-info.component.html',
  styleUrls: ['./contract-info.component.scss']
})
export class ContractInfoComponent implements OnInit {

  bTerminateContract: boolean = false;

  contract: ContractModel = <ContractModel>{};

  contractForm: FormGroup;

  private _bEditing: boolean = false;
  get bEditing(): boolean {
    return this._bEditing;
  }
  set bEditing(value: boolean) {
    this._bEditing = value;

    if (this.bEditing) {
      this.contractForm.controls['title'].enable();
      this.contractForm.controls['description'].enable();
    }
    else {
      this.contractForm.controls['title'].disable();
      this.contractForm.controls['description'].disable();
    }
  }

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private contractService: ContractService, private dateHelper: DateHelper) {
    this.contractForm = this.formBuilder.group({
      title: [{ value: '', disabled: true }, Validators.required],
      description: [{ value: '', disabled: true }, Validators.nullValidator],
      initialDate: [{ value: '--/--/----', disabled: true }, Validators.nullValidator],
      finalDate: [{ value: '--/--/----', disabled: true }, Validators.nullValidator],
    });
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        map((params) => {
          this.contractService.getContract(params['contractId']).pipe(
            map((contract) => {
              this.contract = contract;
              this.resetFormValues();
            })
          ).subscribe();
        })
      ).subscribe();
  }

  resetFormValues() {
    this.contractForm.setValue({
      title: this.contract.title,
      description: this.contract.description,
      initialDate: this.dateHelper.DateToString(new Date(this.contract.initialDate)),
      finalDate: this.contract.finalDate ? this.dateHelper.DateToString(new Date(this.contract.finalDate)) : '--/--/----'
    })
  }

  btnEditClick() {
    this.bEditing = true;
  }
  btnSaveClick() {
    if (!this.contractForm.controls['title'].valid) {
      alert('Título inválido');
      return;
    }

    const contract: UpdateContractModel = <UpdateContractModel>this.contractForm.value;
    this.contractService.updateContract(this.contract.id, contract).pipe(
      map((contract) => {
        this.contract = contract;
        this.bEditing = false;
      }),
      catchError((err) => {
        alert('Não foi possível salvar as informações do contracto');
        return throwError(() => err);
      })
    ).subscribe();
  }
  btnCancelClick() {
    this.bEditing = false;
    this.resetFormValues();
  }
  btnTerminateClick() {
    this.bTerminateContract = true;
  }
  onTerminateContractConfirmClick() {
    this.contractService.terminateContract(this.contract.id).pipe(
      map((contract) => {
        this.contract = contract;
        this.resetFormValues();
        this.bTerminateContract = false;
      })
    ).subscribe();
  }
  onTerminateContractCancelClick() {
    this.bTerminateContract = false;
  }

}
