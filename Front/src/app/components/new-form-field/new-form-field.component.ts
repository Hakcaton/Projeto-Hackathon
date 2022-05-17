import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs';
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

  constructor(private formBuilder: FormBuilder, private formFieldService: FormFieldService) { }

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
        console.log(value);
       
        if(value == 1){
          this.bDescricao = false;
        }
        if(value == 0){
          this.bDescricao = true;
        }
    })
  }

  btnConfirmClick() {
    console.log(this.formNewFieldForm);
    this.onAdded.emit();
  }

  btnCancelClick() {
    this.onCancel.emit();
  }
}
