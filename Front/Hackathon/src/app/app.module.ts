import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PasswordInputComponent } from './tools/password-input/password-input.component';

import { ForgotpasswordModuleComponent } from './modules/authentication-module/forgot-password-module/forgot-password-module.component';
import { ResetPasswordModuleComponent as ResetPasswordModuleComponent } from './modules/authentication-module/reset-password-module/reset-password-module.component';
import { LoginModuleComponent } from './modules/authentication-module/login-module/login-module.component';
import { ProfileModuleComponent } from './modules/profile-module/profile-module.component';
import { AuthenticationModuleComponent } from './modules/authentication-module/authentication-module.component';
import { CompanyRegistrationModuleComponent } from './modules/company-registration-module/company-registration-module.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { DocumentsModuleComponent } from './modules/documents-module/documents-module.component';
import { MenuNavComponent } from './tools/menu-nav/menu-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationLayoutComponent } from './layout/authentication-layout/authentication-layout.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginModuleComponent,
    ProfileModuleComponent,
    PasswordInputComponent,
    ForgotpasswordModuleComponent,
    ResetPasswordModuleComponent,
    AuthenticationModuleComponent,
    CompanyRegistrationModuleComponent,
    DocumentsModuleComponent,
    MenuNavComponent,
    HomeComponent,
    AuthenticationLayoutComponent,
    DashboardComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    LayoutModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
  ],
  providers: [
    FormBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
