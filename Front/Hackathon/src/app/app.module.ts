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
import { AuthService } from './tools/auth/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    LoginModuleComponent,
    ProfileModuleComponent,
    PasswordInputComponent,
    ForgotpasswordModuleComponent,
    ResetPasswordModuleComponent,
    AuthenticationModuleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
