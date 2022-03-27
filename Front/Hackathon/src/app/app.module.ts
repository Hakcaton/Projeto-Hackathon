import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PasswordInputComponent } from './tools/password-input/password-input.component';

import { ForgotpasswordModuleComponent } from './modules/authentication-module/forgot-password-module/forgot-password-module.component';
import { ResetPasswordModuleComponent as ResetPasswordModuleComponent } from './modules/authentication-module/reset-password-module/reset-password-module.component';
import { LoginModuleComponent } from './modules/authentication-module/login-module/login-module.component';
import { ProfileModuleComponent } from './modules/profile-module/profile-module.component';
import { AuthenticationModuleComponent } from './modules/authentication-module/authentication-module.component';
import { MenuModuleComponent } from './tools/menu-module/menu-module.component';
import { AuthService } from 'src/Services/auth.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginModuleComponent,
    ProfileModuleComponent,
    PasswordInputComponent,
    ForgotpasswordModuleComponent,
    ResetPasswordModuleComponent,
    AuthenticationModuleComponent,
    MenuModuleComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    AuthService,
    MenuModuleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
