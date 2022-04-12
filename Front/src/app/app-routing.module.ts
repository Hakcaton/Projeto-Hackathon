import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAuthGuard } from './auth-guards/default-auth.guard';
import { InternalAuthGuard } from './auth-guards/internal-auth.guard';
import { OutsourcedAuthGuard } from './auth-guards/outsourced-auth.guard';
import { AuthenticationComponent } from './views/common/authentication/authentication.component';
import { CompanyRegistrationComponent } from './views/internal/company-registration/company-registration.component';
import { ProfileComponent } from './views/internal/profile/profile.component';
import { PendingDocsComponent } from './views/outsourced/pending-docs/pending-docs.component';

const routes: Routes = [

  { path: 'empresas/cadastrar', component: CompanyRegistrationComponent, canActivate: [InternalAuthGuard] },
  { path: 'perfil', component: ProfileComponent, canActivate: [InternalAuthGuard] },

  { path: 'documentos/pendentes', component: PendingDocsComponent, canActivate: [OutsourcedAuthGuard] },

  { path: 'autenticacao', component: AuthenticationComponent, canActivate: [DefaultAuthGuard] },

  { path: '**', redirectTo: '/perfil', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
