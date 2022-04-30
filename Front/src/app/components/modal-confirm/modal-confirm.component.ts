import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.scss']
})
export class ModalConfirmComponent {

  @Output() onCancel: EventEmitter<void> = new EventEmitter();
  @Output() onConfirm: EventEmitter<void> = new EventEmitter();

  @Input() title: string= '';
  @Input() text: any= '<br>';
  @Input() btnConfirmText: string = 'Confirmar';
  @Input() btnCancelText: string = 'Cancelar';

  btnCancelClick(){
    this.onCancel.emit();
  }

  btnConfirmClick(){
    this.onConfirm.emit();
  }
}
