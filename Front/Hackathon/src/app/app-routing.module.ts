import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationLayoutComponent } from './layout/authentication-layout/authentication-layout.component';
import { HomeComponent } from './layout/home/home.component';
import { AuthenticationModuleGuard } from './modules/authentication-module/authentication-module.guard';
import { LoginModuleComponent } from './modules/authentication-module/login-module/login-module.component';
import { ResetPasswordModuleComponent } from './modules/authentication-module/reset-password-module/reset-password-module.component';
import { CompanyRegistrationModuleComponent } from './modules/company-registration-module/company-registration-module.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DocumentsModuleComponent } from './modules/documents-module/documents-module.component';
import { ProfileModuleComponent } from './modules/profile-module/profile-module.component';


const routes: Routes = [
  { //ESTRUTURA DE ROTAS GERAIS AS QUAIS CORRESPONDEM AOS MODULOS. PÓS AUTENTICACAO
    path: '' , 
    component: HomeComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'documentos', component: DocumentsModuleComponent },
      {path: 'perfil', component: ProfileModuleComponent},
      {path: 'cadastroterceiro', component: CompanyRegistrationModuleComponent}

    ],
    canActivate: [AuthenticationModuleGuard]
  },
  {//ESTRUTURA DE ROTAS DE LOGIN ANTES DA AUTENTICAÇAO
    path: '',
    component: AuthenticationLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginModuleComponent },
      {path: 'reset', component: ResetPasswordModuleComponent },

    ]
  }
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
