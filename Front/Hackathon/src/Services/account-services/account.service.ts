import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { IUsuario } from 'src/app/modules/authentication-module/login-module/login-module.interface';
import { IResponseAccount } from './account-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

 
  constructor(private http: HttpClient) { }

  login(user: IUsuario){
    return this.http.post<IResponseAccount>('/api/authentication/login', user).pipe(
      map((res) => {
        window.localStorage.setItem('token', res.authToken );
      })
    );
  
  }
  
  resetPassword(newPassword: any){
    return new Promise((resolve) => {
      resolve(true);
    });
  }
}
