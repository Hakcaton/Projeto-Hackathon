import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authentication-module',
  templateUrl: './authentication-module.component.html',
  styleUrls: ['./authentication-module.component.scss']
})
export class AuthenticationModuleComponent implements OnInit {

  blnLoginForm: boolean = true;
  blnForgotPasswordForm: boolean = false;
  blnResetPasswordForm: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onForgotPasswordClick(){
    this.blnForgotPasswordForm = true;
    this.blnLoginForm = false;
    this.blnResetPasswordForm = false;
  }

  onBackClick() {
    this.blnForgotPasswordForm = false;
    this.blnLoginForm = true;
    this.blnResetPasswordForm = false;
  }
  
  

}
