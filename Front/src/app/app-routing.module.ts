import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAuthGuard } from './auth-guards/default-auth.guard';
import { InternalAuthGuard } from './auth-guards/internal-auth.guard';
import { OutsourcedAuthGuard } from './auth-guards/outsourced-auth.guard';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { UnauthenticatedLayoutComponent } from './layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticationComponent } from './views/common/authentication/authentication.component';
import { LoginComponent } from './views/common/authentication/login/login.component';
import { ResetPasswordComponent } from './views/common/authentication/reset-password/reset-password.component';
import { CompanyRegistrationComponent } from './views/internal/company-registration/company-registration.component';
import { HomePageComponent } from './views/internal/home-page/home-page.component';
import { ProfileComponent } from './views/internal/profile/profile.component';
import { PendingDocsComponent } from './views/outsourced/pending-docs/pending-docs.component';
import { SentDocComponent } from './views/outsourced/sent-doc/sent-doc.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomePageComponent,
        // canActivate: [InternalAuthGuard],
      },
      {
        path: 'empresas/cadastrar',
        component: CompanyRegistrationComponent,
        // canActivate: [InternalAuthGuard],
      },
      {
        path: 'empresas/profile',
        component: CompanyRegistrationComponent,
        // canActivate: [InternalAuthGuard],
      },
      {
        path: 'perfil',
        component: ProfileComponent,
        // canActivate: [InternalAuthGuard],
      },
      {
        path: 'documentos/pendentes',
        component: PendingDocsComponent,
        // canActivate: [OutsourcedAuthGuard],
      },
      {
        path: 'documentos/enviados',
        component: SentDocComponent,
        // canActivate: [OutsourcedAuthGuard],
      },
    ],
    canActivate: [InternalAuthGuard],
  },
  {
    path: 'autenticacao',
    component: UnauthenticatedLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'resetpassword',
        component: ResetPasswordComponent,
      },
    ],
    canActivate: [DefaultAuthGuard],
  },

  { path: '**', redirectTo: 'autenticacao', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
