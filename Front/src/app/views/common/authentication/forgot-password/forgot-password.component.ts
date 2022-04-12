import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  @Output() onBackClick = new EventEmitter();
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { 
    this.formGroup = formBuilder.group({
      email: ["", Validators.email] 
    })
  }

  ngOnInit(): void {
  }

  btnBackClick() { }

  btnConfirmClick() { }

}
