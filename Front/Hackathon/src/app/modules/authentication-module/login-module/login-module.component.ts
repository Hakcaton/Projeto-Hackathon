import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/tools/auth/auth.service';


import { IUsuario } from './login-module.interface';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.scss']
})
export class LoginModuleComponent implements OnInit {

  lembrarSenha: boolean = false;
  usuario: IUsuario = new IUsuario();
  
  
  constructor(private authService: AuthService) { }
  
  @Output() onForgotPasswordClick = new EventEmitter();
  
  ngOnInit(): void {
    console.log(this.usuario.email);
    console.log(this.lembrarSenha);
    
  }

  fazerLogin(){
    console.log(this.usuario);
    this.authService.fazerLogin(this.usuario);
  }

  onRecuperarSenha(){
    this.onForgotPasswordClick.emit();
  }
}
