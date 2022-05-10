import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
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
    private companyService: CompanyService,
    private toastr: ToastrService
  ) {
    this.contractRegistrationForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.nullValidator],
    });
  }
  ngOnInit(): void {}

  btnConfirmClick() {
    if (!this.contractRegistrationForm.controls['title'].valid) {
      this.toastr.error('Titulo Inválido.', 'Cadastrp de Contrato');
      return;
    }

    this.companyService
      .registerContract(this.contractRegistrationForm.value, this.companyCnpj)
      .pipe(
        map((contract) => {
          contract.initialDate = new Date(contract.initialDate);
          this.onAdded.emit(contract);
          this.toastr.success('Contrato cadastrado com sucesso', 'Cadastro de Contrato');
        }),
        catchError((err) => {
          this.toastr.error('Não foi possível adicionar o contrato', 'Cadastro de Contrato');
          return throwError(() => err);
        })
      )
      .subscribe();
  }

  btnCancelClick() {
    this.onCancel.emit();
  }
}
