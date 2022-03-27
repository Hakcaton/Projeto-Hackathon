import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUsuario } from 'src/app/modules/authentication-module/login-module/login-module.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  usuarioAutenticado: boolean = false;

  constructor(private router: Router) { }

  fazerLogin(usuario: IUsuario){
    
    if (usuario.email === "usuario@gmail.com" && usuario.senha === "123456" ){

      this.usuarioAutenticado = true;
      this.router.navigate(["/"]);

    }
    else{
      this.usuarioAutenticado = false;
    }
  }

 
}
