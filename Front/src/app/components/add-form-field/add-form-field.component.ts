import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, map, of } from 'rxjs';
import { AddFormFieldModel } from 'src/app/models/add-form-field.model';
import { FormFieldModel } from 'src/app/models/form-field.model';
import { ContractService } from 'src/app/services/contract.service';
import { DateHelper } from 'src/app/tools/helpers/date.helper';

@Component({
  selector: 'app-add-form-field',
  templateUrl: './add-form-field.component.html',
  styleUrls: ['./add-form-field.component.scss']
})
export class AddFormFieldComponent {
  formFieldForm: FormGroup;

  @Output() onAdded: EventEmitter<FormFieldModel> = new EventEmitter<FormFieldModel>();

  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() contractId: string = '';

  constructor(private formBuilder: FormBuilder, private contractService: ContractService, private dateHelper: DateHelper) {
    this.formFieldForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: ['', Validators.required],
      recurrence: [0, Validators.required],
      firstRequestDate: [this.dateHelper.DateToString(new Date()), [Validators.required, Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)]],
      required: [true, Validators.required],
      individual: ['', Validators.required],
    });
  }

  btnConfirmClick() {
    if (!this.formFieldForm.controls['title'].valid) {
      alert('Título inválido');
      return;
    }
    if (!this.formFieldForm.controls['recurrence'].valid) {
      alert('Recorrência inválida');
      return;
    }
    if (!this.formFieldForm.controls['firstRequestDate'].valid) {
      alert('Data da primeira solicitação inválida');
      return;
    }

    const dateParts = this.formFieldForm.controls['firstRequestDate'].value.split("/");

    const formField: AddFormFieldModel = {
      ...this.formFieldForm.value,
      firstRequestDate: new Date(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]))
    }

    this.contractService.addFormField(this.contractId, formField).pipe(
      map((formField) => {
        formField.firstRequestDate = new Date(formField.firstRequestDate);
        this.onAdded.emit(formField);
      }),
      catchError((error) => {
        if (error.status === 409) {
          alert('Título já cadastrado');
        }
        return of(0);
      })
    ).subscribe();
  }

  btnCancelClick() {
    this.onCancel.emit();
  }

}
