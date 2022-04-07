import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-reset-password-module',
  templateUrl: './reset-password-module.component.html',
  styleUrls: ['./reset-password-module.component.scss']
})
export class ResetPasswordModuleComponent implements OnInit {

  constructor() { }

  @Output() onConfirmPasswordChange = new EventEmitter();


  ngOnInit(): void {
  }

  onClickConfirmChange(){
    this.onConfirmPasswordChange.emit();
  }
}
