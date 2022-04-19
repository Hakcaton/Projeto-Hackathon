import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent implements OnInit {

  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onConfirm: EventEmitter<void> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  btnCancelClick(){
    this.onCancel.emit();
  }

  btnConfirmClick(){
    this.onConfirm.emit();
  }
}
