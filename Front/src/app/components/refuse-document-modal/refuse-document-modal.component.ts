import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-refuse-document-modal',
  templateUrl: './refuse-document-modal.component.html',
  styleUrls: ['./refuse-document-modal.component.scss']
})
export class RefuseDocumentModalComponent {

  @Output() onConfirmClick: EventEmitter<string> = new EventEmitter();

  @Output() onCancelClick: EventEmitter<void> = new EventEmitter();

  refuseForm: FormGroup;

  constructor(private formBuilder: FormBuilder,) {
    this.refuseForm = this.formBuilder.group({
      reason: ['', Validators.required]
    });
  }

  btnConfirmClick() {
    this.onConfirmClick.emit(this.refuseForm.controls['reason'].value);
  }

  btnCancelClick() {
    this.onCancelClick.emit();
  }

}
