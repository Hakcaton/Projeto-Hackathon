import { Injectable } from '@angular/core';
import { IUsuario } from 'src/app/modules/authentication-module/login-module/login-module.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }

   login(user: IUsuario){
    console.log(`objeto recebido no service userLogin: ${user}`)
    return new Promise((resolve) => {
      window.localStorage.setItem('token', 'meu-token');
      resolve(true);
    });
  }

  resetPassword(newPassword: any){
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
