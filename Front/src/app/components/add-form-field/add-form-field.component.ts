import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, of, throwError } from 'rxjs';
import { AddFormFieldModel } from 'src/app/models/add-form-field.model';
import { FormFieldTemplateModel } from 'src/app/models/form-field-template.model';
import { FormFieldModel } from 'src/app/models/form-field.model';
import { ContractService } from 'src/app/services/contract.service';
import { FormFieldService } from 'src/app/services/form-field.service';
import { DateHelper } from 'src/app/tools/helpers/date.helper';

@Component({
  selector: 'app-add-form-field',
  templateUrl: './add-form-field.component.html',
  styleUrls: ['./add-form-field.component.scss']
})
export class AddFormFieldComponent implements OnInit {
  formFieldTemplates: FormFieldTemplateModel[] = [];

  formFieldForm: FormGroup;

  @Output() onAdded: EventEmitter<FormFieldModel> = new EventEmitter<FormFieldModel>();

  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  @Input() contractId: string = '';

  @ViewChild('colInputDescription') colInputDescription: any;

  constructor(private formBuilder: FormBuilder, private contractService: ContractService, private dateHelper: DateHelper, private toastr: ToastrService, private formFieldService: FormFieldService) {
    this.formFieldForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: [{ value: 0, disabled: true }, Validators.required],
      description: [{ value: '', disabled: true }, Validators.nullValidator],
      recurrence: [{ value: 0, disabled: true }, Validators.required],
      firstRequestDate: [this.dateHelper.DateToString(new Date()), [Validators.required, Validators.pattern(/^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/)]],
      required: [{ value: true, disabled: true }, Validators.required],
      individual: [{ value: false, disabled: true }, Validators.required]
    });
  }

  ngOnInit(): void {
    this.formFieldService.getFormFieldTemplates().pipe(
      map((formFieldTemplates) => {
        this.formFieldTemplates = formFieldTemplates.sort((A, B) => { return A.title.localeCompare(B.title) })
      })
    ).subscribe();
  }

  btnConfirmClick() {
    if (this.formFieldForm.controls['title'].invalid) {
      this.toastr.error('Título inválido', 'Adicionar Documento');
      return;
    }
    if (this.formFieldForm.controls['recurrence'].invalid) {
      this.toastr.error('Recorrência inválida', 'Adicionar Documento');
      return;
    }
    if (this.formFieldForm.controls['firstRequestDate'].invalid) {
      this.toastr.error('Data da primeira solicitação inválida', 'Adicionar Documento');
      return;
    }

    const dateParts = this.formFieldForm.controls['firstRequestDate'].value.split("/");

    const formField: AddFormFieldModel = {
      ...this.formFieldForm.getRawValue(),
      firstRequestDate: new Date(new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]))
    }

    this.contractService.addFormField(this.contractId, formField).pipe(
      map((formField) => {
        formField.firstRequestDate = new Date(formField.firstRequestDate);
        this.onAdded.emit(formField);
        this.toastr.success('Documento solicitado com sucesso', 'Solicitação de Documentos');
      }),
      catchError((error) => {
        this.toastr.error('Ocorreu um erro inesperado ao solicitar o documento', 'Solicitação de Documentos');
        return throwError(() => error);
      })
    ).subscribe();
  }

  btnCancelClick() {
    this.onCancel.emit();
  }

  onTitleChange() {
    const formFieldTemplateId: string = this.formFieldForm.controls['title'].value;
    const formFieldTemplate: FormFieldTemplateModel | undefined = this.formFieldTemplates.find((x) => { return x.id == formFieldTemplateId });

    if (!formFieldTemplate) {
      this.resetFormValues();
      return;
    };

    this.formFieldForm.patchValue({
      subtitle: formFieldTemplate.subtitle,
      description: formFieldTemplate.description,
      recurrence: formFieldTemplate.recurrence,
      required: formFieldTemplate.required,
      individual: formFieldTemplate.individual
    });

    this.colInputDescription.nativeElement.hidden = formFieldTemplate.subtitle == 1;

    if (formFieldTemplate.customizable) {
      this.enableFormControls();
    }
    else {
      this.disableFormControls();
    }
  }

  onSubtitleChange() {
    if (this.colInputDescription)
      this.colInputDescription.nativeElement.hidden = this.formFieldForm.controls['subtitle'].value == 1;
  }

  resetFormValues() {
    this.formFieldForm.patchValue({
      subtitle: '',
      recurrence: 0,
      required: true,
      individual: false
    });
    this.disableFormControls();
  }

  enableFormControls() {
    this.formFieldForm.controls['subtitle'].enable();
    this.formFieldForm.controls['description'].enable();
    this.formFieldForm.controls['recurrence'].enable();
    this.formFieldForm.controls['required'].enable();
    this.formFieldForm.controls['individual'].enable();
  }

  disableFormControls() {
    this.formFieldForm.controls['subtitle'].disable();
    this.formFieldForm.controls['description'].disable();
    this.formFieldForm.controls['recurrence'].disable();
    this.formFieldForm.controls['required'].disable();
    this.formFieldForm.controls['individual'].disable();
  }
}
