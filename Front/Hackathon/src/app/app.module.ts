import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModuleComponent } from './modules/login-module/login-module.component';
import { PerfilModuleComponent } from './modules/perfil-module/perfil-module.component';
import { PasswordInputComponent } from './tools/password-input/password-input.component';
import { ForgotpasswordModuleComponent } from './modules/forgotpassword-module/forgotpassword-module/forgotpassword-module.component';
import { SetpasswordModuleComponent } from './modules/setpassword-module/setpassword-module/setpassword-module.component';
import { AuthService } from './Services/auth/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginModuleComponent,
    PerfilModuleComponent,
    PasswordInputComponent,
    ForgotpasswordModuleComponent,
    SetpasswordModuleComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
