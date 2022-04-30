import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultAuthGuard } from './auth-guards/default-auth.guard';
import { InternalAuthGuard } from './auth-guards/internal-auth.guard';
import { OutsourcedAuthGuard } from './auth-guards/outsourced-auth.guard';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { AuthenticationComponent } from './views/common/authentication/authentication.component';
import { CompanyContractsComponent } from './views/internal/company-contracts/company-contracts.component';
import { CompanyRegistrationComponent } from './views/internal/company-registration/company-registration.component';
import { RegisteredCompaniesComponent } from './views/internal/company/registered-companies/registered-companies.component';
import { ContractFormFieldsComponent } from './views/internal/contract-form-fields/contract-form-fields.component';
import { ContractInfoComponent } from './views/internal/contract-info/contract-info.component';
import { ProfileComponent } from './views/internal/profile/profile.component';
import { OutsourcedCompanyContractsComponent } from './views/outsourced/outsourced-company-contracts/outsourced-company-contracts.component';
import { PendingDocsComponent } from './views/outsourced/pending-docs/pending-docs.component';
import { SentDocsComponent } from './views/outsourced/sent-docs/sent-docs.component';

const routes: Routes = [
  {
    path: 'autenticacao',
    component: AuthenticationComponent,
    canActivate: [DefaultAuthGuard],
  },
  {
    path: 'interno',
    component: AuthenticatedLayoutComponent,
    children: [
      {
        path: 'empresas',
        component: RegisteredCompaniesComponent,
      },
      {
        path: 'empresas/cadastrar',
        component: CompanyRegistrationComponent,
      },
      {
        path: 'empresas/:companyCNPJ/contratos',
        component: CompanyContractsComponent,
      },
      {
        path: 'contratos/:contractId',
        component: ContractInfoComponent
      },
      {
        path: 'contratos/:contractId/formulario',
        component: ContractFormFieldsComponent
      },
      {
        path: 'perfil',
        component: ProfileComponent,
      },
    ],
    canActivate: [InternalAuthGuard],
  },
  {
    path: 'externo',
    component: AuthenticatedLayoutComponent,
    children: [
      {
        path: 'contratos',
        component: OutsourcedCompanyContractsComponent,
      },
      {
        path: 'contratos/:contractId/documentos/pendentes',
        component: PendingDocsComponent,
      },
      {
        path: 'contratos/:contractId/documentos/enviados',
        component: SentDocsComponent,
      },
    ],
    canActivate: [OutsourcedAuthGuard],
  },
  {
    path: '**',
    redirectTo: 'autenticacao',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
