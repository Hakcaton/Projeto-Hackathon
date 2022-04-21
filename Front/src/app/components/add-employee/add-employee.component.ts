import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDocumentModel } from 'src/app/models/employee-document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
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
          // Validators.pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  btnConfirmClick() {
    if (!this.employeeForm.controls['cpf'].valid) {
      alert('CPF inválido');
      return;
    }
    let newEmployee: EmployeeDocumentModel = {
      id: '',
      fullName: this.employeeForm.controls['fullName'].value,
      cpf: this.employeeForm.controls['cpf'].value,
      documents: [],
      active: true,
    };
    try {
      var registeredEmployee: EmployeeDocumentModel | null = null;
      registeredEmployee = this.documentsService.addEmployee(newEmployee);
    } catch {
      alert('CPF já cadastrado!');
      return;
    }
    this.onAdded.emit(registeredEmployee);
  }

  btnCancelClick() {
    this.onCancel.emit();
  }
}
