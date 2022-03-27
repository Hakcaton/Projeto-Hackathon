import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth/auth.service';
import { IUsuario } from './login-module.interface';

@Component({
  selector: 'app-login-module',
  templateUrl: './login-module.component.html',
  styleUrls: ['./login-module.component.scss']
})
export class LoginModuleComponent implements OnInit {

  blnRecuperarSenha: boolean = false;
  usuario: IUsuario = new IUsuario();
  email: string = "";

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
     this.usuario.email = "clebinhoXUXUCAO"
     console.log(this.email);
     console.log(this.usuario.email);
  }

  ngAfterViewInit(): void{
    console.log(this.usuario)
  }

  fazerLogin(){
    console.log(this.usuario);
    this.authService.fazerLogin(this.usuario);
  }

  onRecuperarSenha(){

  }
}
