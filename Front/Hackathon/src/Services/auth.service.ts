import { EventEmitter, Injectable, Output } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUsuario } from 'src/app/modules/authentication-module/login-module/login-module.interface';


@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivateChild {

  private  usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new EventEmitter<boolean>();

  constructor(public router: Router){}

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> { return true}

  fazerLogin(usuario: IUsuario){
    
    if (usuario.email === "usuario@gmail.com" && usuario.senha === "123456" ){

      this.usuarioAutenticado = true;
      this.mostrarMenuEmitter.emit(true);
      this.router.navigate(["perfil"]);

    }
    else{
      this.usuarioAutenticado = false;
      this.mostrarMenuEmitter.emit(false);
    }

    return this.usuarioAutenticado;
  }

 
}
