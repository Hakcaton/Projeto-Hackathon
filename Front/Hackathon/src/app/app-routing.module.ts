import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginModuleComponent } from './modules/login-module/login-module.component';
import { PerfilModuleComponent } from './modules/perfil-module/perfil-module.component';

const routes: Routes = [
  {path: "login", component: LoginModuleComponent},
  {path: "perfil", component: PerfilModuleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
