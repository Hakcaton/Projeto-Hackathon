import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, map, throwError } from 'rxjs';
import { ContractModel } from 'src/app/models/contract.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-contracts-registration-modal',
  templateUrl: './contracts-registration-modal.component.html',
  styleUrls: ['./contracts-registration-modal.component.scss'],
})
export class ContractsRegistrationModalComponent implements OnInit {
  @Input() companyCnpj: string = '';

  @Output() onAdded: EventEmitter<ContractModel> = new EventEmitter();

  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  contractRegistrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService
  ) {
    this.contractRegistrationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.nullValidator],
    });
  }
  ngOnInit(): void {}

  btnConfirmClick() {
    if (!this.contractRegistrationForm.controls['title'].valid) {
      alert('Titulo Inválido.');
      return;
    }

    this.companyService
      .registerContract(this.contractRegistrationForm.value, this.companyCnpj)
      .pipe(
        map((contract) => {
          contract.initialDate = new Date(contract.initialDate);
          this.onAdded.emit(contract);
        }),
        catchError((err) => {
          alert('Não foi possível adicionar o contrato');
          return throwError(() => err);
        })
      )
      .subscribe();
  }

  btnCancelClick() {
    this.onCancel.emit();
  }
}
