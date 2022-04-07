import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';


import { IUsuario } from './login-module.interface';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.scss']
})
export class LoginModuleComponent implements OnInit {

  lembrarSenha: boolean = false;
  formGroup: FormGroup;
  
  
  constructor(private authService: AuthService, private router: Router, private formBuilder: FormBuilder) {
    this.formGroup = formBuilder.group({
      email: ['', [Validators.required, Validators.email, Validators.maxLength(320)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      remember: ['']
    })
   }
  
  @Output() onForgotPasswordClick = new EventEmitter();
  
  ngOnInit(): void {
    
  }

  login(){
    // this.authService.fazerLogin(this.usuario);
  }

  onRecuperarSenha(){
    this.onForgotPasswordClick.emit();
  }
}
