import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, map, Observable, of, throwError } from 'rxjs';
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

  constructor(
    private formBuilder: FormBuilder,
    private documentsService: DocumentsService
  ) {
    this.employeeForm = formBuilder.group({
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
    this.documentsService;
    let body = this.employeeForm.value;
    body.contractId = '1';
    this.documentsService
      .addEmployee(body)
      .pipe(
        map((employee: any) => {
          this.onAdded.emit(employee);
        }),
        catchError((error) => {
          if (error.status === 409) {
            alert('CPF já cadastrado');
          }
          return of(0);
        })
      )
      .subscribe();
  }

  btnCancelClick() {
    this.onCancel.emit();
  }
}
