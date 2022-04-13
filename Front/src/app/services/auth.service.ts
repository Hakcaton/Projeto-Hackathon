import { Injectable } from '@angular/core';
import { LoginModel } from '../models/login.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = false;

  constructor(private http: HttpClient, private router: Router) {
    this.refresh()
    setInterval(() => {
      this.refresh()
    }, 100);
  }

  public getToken() {
    const token = localStorage.getItem('token');

    return token;
  }

  public refresh() {
    const token = this.getToken();

    if (!token) {
      if (this.isAuthenticated) {
        alert('Sua sessão expirou');
        this.isAuthenticated = false;
        this.router.navigateByUrl('/autenticacao');
      }
      return;
    }

    if (this.isAuthenticated) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);

        if (typeof (decoded.exp) === 'number') {
          this.isAuthenticated = decoded.exp > new Date().getTime() / 1000;
        }

        if (!this.isAuthenticated) {
          localStorage.removeItem('token');
          alert('Sua sessão expirou');
          this.router.navigateByUrl('/autenticacao');
        }
      }
      catch {
        localStorage.removeItem('token');
        alert('Sua sessão expirou');
        this.router.navigateByUrl('/autenticacao');
      }
    }
    else {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        if (typeof (decoded.exp) === 'number') {
          this.isAuthenticated = decoded.exp > new Date().getTime() / 1000;
        }
        if (!this.isAuthenticated) {
          localStorage.removeItem('token');
        }
      }
      catch {
        localStorage.removeItem('token');
      }
    }
  }

  login(loginData: LoginModel) {

    let encryptedPassword = this.encryptPassword(loginData.password);
    loginData.password = encryptedPassword;
    let url = '/api/authentication/login'
    return this.http.post(url, loginData).pipe(
      map((res: any) => {
        window.localStorage.setItem('token', res.authToken);
      })
    );
  }

  encryptPassword(password: string){
    return Md5.hashStr(password);
  }


}
