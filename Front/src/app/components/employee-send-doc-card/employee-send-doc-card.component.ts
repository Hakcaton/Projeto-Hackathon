import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, throwError } from 'rxjs';
import { EmployeeDocumentModel } from 'src/app/models/employee-document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-employee-send-doc-card',
  templateUrl: './employee-send-doc-card.component.html',
  styleUrls: ['./employee-send-doc-card.component.scss'],
})
export class EmployeeSendDocCardComponent implements OnInit {
  @Input() data: EmployeeDocumentModel = {
    id: '',
    fullName: '',
    cpf: '',
    documents: [],
    active: true,
  };

  @ViewChild('cardArrow') cardArrow: any;

  isCollapsed: boolean = true;

  employeeForm: FormGroup;

  bRemoveModal: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private documentsService: DocumentsService,
    private toastr: ToastrService
  ) {
    this.employeeForm = this.formBuilder.group({
      fullName: [{ value: '', disabled: true }, [Validators.required]],
      cpf: [
        { value: '', disabled: true },
        [
          Validators.required,
          Validators.pattern(/^[0-9]{3}.[0-9]{3}.[0-9]{3}-[0-9]{2}$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.employeeForm.controls['fullName'].setValue(this.data.fullName);
    this.employeeForm.controls['cpf'].setValue(this.data.cpf);
  }

  headerClick() {
    this.isCollapsed = !this.isCollapsed;
    this.cardArrow.nativeElement.classList.toggle('collapsed');
  }

  btnEditFullNameClick() {
    this.employeeForm.controls['fullName'].enable();
  }
  btnSaveFullNameClick() {
    if (!this.employeeForm.controls['fullName'].valid) {
      this.toastr.error('Nenhum nome informado');
      return;
    }
    this.employeeForm.controls['fullName'].disable();
    this.documentsService.updateEmployeeFullName(this.employeeForm.controls['fullName'].value, this.data.id).pipe(
      map((employee: any) => {
        this.data.fullName = employee.fullName;
        this.toastr.success('Nome salvo com sucesso');
      }),
      catchError(err => {
        this.employeeForm.controls['fullName'].enable();
        this.toastr.error('Ocorreu um erro ao salvar o nome');
        return throwError(() => err);
      })
    ).subscribe();
  }

  btnEditCPFClick() {
    this.employeeForm.controls['cpf'].enable();
  }
  btnSaveCPFClick() {
    if (!this.employeeForm.controls['cpf'].valid) {
      this.toastr.error('CPF inválido');
      return;
    }
    this.employeeForm.controls['cpf'].disable();
    this.documentsService.updateEmployeeCPF(this.employeeForm.controls['cpf'].value, this.data.id).pipe(
      map((employee: any) => {
        this.data.cpf = employee.cpf;
        this.toastr.success('CPF salvo com sucesso');
      }),
      catchError(err => {
        this.employeeForm.controls['cpf'].enable();
        this.toastr.error('Ocorreu um erro ao salvar o CPF');
        return throwError(() => err);
      })
    ).subscribe();
  }

  btnRemoveClick() {
    this.bRemoveModal = true;
  }

  onRemoveConfirm() {
    this.documentsService.removeEmployee(this.data.id).pipe(
      map(()=>{
        this.data.active = false;
        this.bRemoveModal = false;
      })
    ).subscribe();
  }

  onRemoveCancel() {
    this.bRemoveModal = false;
  }
}
