import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { catchError, map, throwError } from 'rxjs';
import { recurrence } from 'src/app/constants/recurrence.constant';
import { tags } from 'src/app/constants/tags.constant';
import { FormFieldModel } from 'src/app/models/form-field.model';
import { UpdateFormFieldModel } from 'src/app/models/update-formField.model';
import { ContractService } from 'src/app/services/contract.service';
import { FormFieldService } from 'src/app/services/form-field.service';
import { DateHelper } from 'src/app/tools/helpers/date.helper';

@Component({
  selector: 'app-form-field-card',
  templateUrl: './form-field-card.component.html',
  styleUrls: ['./form-field-card.component.scss']
})
export class FormFieldCardComponent implements OnInit {

  isCollapsed: boolean = true;

  bRemoveModal: boolean = false;

  documentForm: FormGroup;

  @ViewChild('cardArrow') cardArrow: any;

  constructor(private contractService: ContractService, private formFieldService: FormFieldService, private formBuilder: FormBuilder, private dateHelper: DateHelper, private toastr: ToastrService) {
    this.documentForm = formBuilder.group({
      title: [{ value: '', disabled: true }, [Validators.required]],
      subtitle: [{ value: '', disabled: true }, [Validators.nullValidator]],
      recurrence: [{ value: '', disabled: true }, [Validators.required]],
      firstRequestDate: [{ value: '--/--/----', disabled: true }, [Validators.required]],
      required: [{ value: true, disabled: true }, [Validators.required]],
      individual: [{ value: '', disabled: true }, [Validators.required]]
    });
  }

  @Input() data: FormFieldModel = {
    id: '',
    title: '',
    subtitle: '',
    description: '',
    recurrence: 0,
    individual: false,
    required: true,
    contractId: '',
    firstRequestDate: new Date()
  };

  tags: any = tags;

  ngOnInit(): void {
    this.documentForm.controls['title'].setValue(this.data.title);
    this.documentForm.controls['subtitle'].setValue(this.data.subtitle);
    this.documentForm.controls['recurrence'].setValue(recurrence.get(this.data.recurrence));
    this.documentForm.controls['firstRequestDate'].setValue(this.dateHelper.DateToString(this.data.firstRequestDate));
    this.documentForm.controls['required'].setValue(this.data.required);
    this.documentForm.controls['individual'].setValue(this.data.individual);
  }

  headerClick() {
    this.isCollapsed = !this.isCollapsed;
    this.cardArrow.nativeElement.classList.toggle('collapsed');
  }

  btnRemoveClick() {
    this.bRemoveModal = true;
  }

  btnEditTitleClick() {
    this.documentForm.controls['title'].enable();
  }

  btnSaveTitleClick() {
    if (!this.documentForm.controls['title'].valid) {
      this.toastr.error('Título inválido');
      return;
    }

    const formField: UpdateFormFieldModel = {
      title: this.documentForm.controls['title'].value
    }

    this.formFieldService.updateFormField(this.data.id, formField).pipe(
      map(() => {
        this.documentForm.controls['title'].disable();
        this.data.title = this.documentForm.controls['title'].value;
        this.toastr.success('Tilulo alterado com sucesso', 'Solicitação de Documentos');
      }),
      catchError((err) => {
        this.toastr.error('Ocorreu um erro ao salvar o Título', 'Solicitação de Documentos');
        return throwError(()=>err);
      })
    ).subscribe();
  }

  btnEditSubtitleClick() {
    this.documentForm.controls['subtitle'].enable();
  }

  btnSaveSubtitleClick() {
    if (!this.documentForm.controls['subtitle'].valid) {
      this.toastr.error('Subtítulo inválido');
      return;
    }

    const formField: UpdateFormFieldModel = {
      subtitle: this.documentForm.controls['subtitle'].value
    }

    this.formFieldService.updateFormField(this.data.id, formField).pipe(
      map(() => {
        this.documentForm.controls['subtitle'].disable();
        this.data.subtitle = this.documentForm.controls['subtitle'].value;
      })
    ).subscribe();
  }
}
