import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from 'src/app/modules/authentication-module/login-module/login-module.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(user: IUsuario){
    return this.http.post<any>('/api/authentication/login', user);
  }

  resetPassword(newPassword: any){
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
