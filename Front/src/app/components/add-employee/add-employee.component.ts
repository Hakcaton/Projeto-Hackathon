import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, throwError } from 'rxjs';
import { EmployeeDocumentModel } from 'src/app/models/employee-document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  @Output() onAdded: EventEmitter<EmployeeDocumentModel | null> =
    new EventEmitter<EmployeeDocumentModel | null>();

  @Output() onCancel: EventEmitter<void> = new EventEmitter();

  @Input() contractId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private documentsService: DocumentsService,
    private toastr: ToastrService
  ) {
    this.employeeForm = this.formBuilder.group({
      fullName: [{ value: '', disabled: false }, [Validators.required]],
      cpf: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/),
        ],
      ],
    });
  }

  btnConfirmClick() {
    if (!this.employeeForm.controls['cpf'].valid) {
      alert('CPF inválido');
      return;
    }
    let body = this.employeeForm.value;
    body.contractId = this.contractId;
    this.documentsService
      .addEmployee(body)
      .pipe(
        map((employee: any) => {
          this.onAdded.emit(employee);
          this.toastr.success('Funcionário cadastrado com sucesso', 'Cadastro de Funcionário')
        }),
        catchError((error) => {
          if (error.status === 409) {
            this.toastr.error('CPF já cadastrado', 'Cadatsro de Funcionário');
          }
          else{
            this.toastr.error('Ocorreu um erro inesperado ao cadastrar o funcionário', 'Cadatsro de Funcionário');
          }
          return throwError(() => error);
        })
      )
      .subscribe();
  }

  btnCancelClick() {
    this.onCancel.emit();
  }
}
