import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  @Output() onConfirmPasswordChange = new EventEmitter();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) {
      this.formGroup = formBuilder.group({
        password:['', Validators.required],
        repeatPassword:['', Validators.required]
      })
   }

  ngOnInit(): void {
  }

}
