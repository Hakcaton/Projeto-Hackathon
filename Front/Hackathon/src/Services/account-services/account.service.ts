import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from 'src/app/modules/authentication-module/login-module/login-module.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  async login(user: IUsuario){
    // Refazer essa requisição.

    this.http.post<any>('/api/authentication/login', {
      email: 'adm@adm.com',
      password: 'a'
    }).subscribe((data: any) =>{
      console.log(data);
    });
    return false;
  }

  resetPassword(newPassword: any){
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
