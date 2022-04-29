import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeDocumentModel } from 'src/app/models/employee-document.model';
import { DocumentsService } from 'src/app/services/documents.service';

@Component({
  selector: 'app-employee-document-validation-card',
  templateUrl: './employee-document-validation-card.component.html',
  styleUrls: ['./employee-document-validation-card.component.scss']
})
export class EmployeeDocumentValidationCardComponent implements OnInit {

  @ViewChild('cardArrow') cardArrow: any;

  @Input() data: EmployeeDocumentModel = <EmployeeDocumentModel>{};

  isCollapsed: boolean = true;

  employeeForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private documentsService: DocumentsService
  ) {
    this.employeeForm = formBuilder.group({
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

}
