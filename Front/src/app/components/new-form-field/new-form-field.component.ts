import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, throwError } from 'rxjs';
import { FormFieldTemplateModel } from 'src/app/models/form-field-template.model';
import { FormFieldService } from 'src/app/services/form-field.service';

@Component({
  selector: 'app-new-form-field',
  templateUrl: './new-form-field.component.html',
  styleUrls: ['./new-form-field.component.scss']
})
export class NewFormFieldComponent implements OnInit {

  bDescricao: boolean = true;
  formFieldTemplates: FormFieldTemplateModel = {} as FormFieldTemplateModel;
  formNewFieldForm: FormGroup = {} as FormGroup;

  @Output() onAdded: EventEmitter<FormFieldTemplateModel> = new EventEmitter<FormFieldTemplateModel>();

  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder, private formFieldService: FormFieldService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formNewFieldForm = this.formBuilder.group({
      title: ['', Validators.required],
      subtitle: [0, Validators.required],
      description: ['', Validators.nullValidator],
      recurrence: [0, Validators.required],
      required: [true , Validators.required],
      individual: [false , Validators.required],
      customizable:[false ,Validators.nullValidator]
    })

    
  }

  ngAfterViewInit(): void{
    this.formNewFieldForm.controls['subtitle'].valueChanges.subscribe(
      (value) => {
        if(value == 1){
          this.bDescricao = false;
        }
        if(value == 0){
          this.bDescricao = true;
        }
    })
  }

  btnConfirmClick() {
    this.formFieldService.addFormFieldTemplate(this.formNewFieldForm.value).pipe(
      map( (formFieldTemplate) => {
        this.onAdded.emit(formFieldTemplate);
        this.toastr.success('Tipo de documento cadastrado com sucesso');
      }),
      catchError((error) => {
        this.toastr.error('Ocorreu um erro inesperado ao cadastrar tipo de documento');
        return throwError(() => error);
      })
    ).subscribe();
  }

  btnCancelClick() {
    this.onCancel.emit();
  }
}
