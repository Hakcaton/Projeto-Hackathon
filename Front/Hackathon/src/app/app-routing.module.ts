import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationModuleComponent } from './modules/authentication-module/authentication-module.component';
import { ProfileModuleComponent } from './modules/profile-module/profile-module.component';


const routes: Routes = [
  { 
    path: "" , 
    redirectTo: "/autenticacao",
    pathMatch: "full"
  },
  { 
    path: "autenticacao", 
    component: AuthenticationModuleComponent,
    // canActivateChild: [AuthService],
    // children: [
    //   { 
    //     path: "perfil",
    //     component: ProfileModuleComponent
    //   }
    // ]
  },
  {
    path: "perfil",
    component: ProfileModuleComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
