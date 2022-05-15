import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './views/common/authentication/authentication.component';
import { LoginComponent } from './views/common/authentication/login/login.component';
import { ForgotPasswordComponent } from './views/common/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/common/authentication/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRegistrationComponent } from './views/internal/company-registration/company-registration.component';
import { DocTagComponent } from './components/doc-tag/doc-tag.component';
import { SendDocCardComponent } from './components/send-doc-card/send-doc-card.component';
import { PendingDocsComponent } from './views/outsourced/pending-docs/pending-docs.component';
import { ProfileComponent } from './views/internal/profile/profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenRefresherInterceptor } from './interceptors/token-refresher.interceptor';
import { TokenSenderInterceptor } from './interceptors/token-sender.interceptor';
import { AuthenticationInterceptor } from './interceptors/authentication.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { UnauthenticatedLayoutComponent } from './layouts/unauthenticated-layout/unauthenticated-layout.component';
import { AuthenticatedLayoutComponent } from './layouts/authenticated-layout/authenticated-layout.component';
import { HomePageComponent } from './views/internal/home-page/home-page.component';
import { EmployeeSendDocCardComponent } from './components/employee-send-doc-card/employee-send-doc-card.component';
import { ModalConfirmComponent } from './components/modal-confirm/modal-confirm.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { NgxMaskModule } from 'ngx-mask';
import { RegisteredCompaniesComponent } from './views/internal/company/registered-companies/registered-companies.component';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { SentDocsComponent } from './views/outsourced/sent-docs/sent-docs.component';
import { CompanyContractsComponent } from './views/internal/company-contracts/company-contracts.component';
import { BadgeComponent } from './components/badge/badge.component';
import { OutsourcedCompanyContractsComponent } from './views/outsourced/outsourced-company-contracts/outsourced-company-contracts.component';
import { ContractFormFieldsComponent } from './views/internal/contract-form-fields/contract-form-fields.component';
import { FormFieldCardComponent } from './components/form-field-card/form-field-card.component';
import { AddFormFieldComponent } from './components/add-form-field/add-form-field.component';
import { ContractsRegistrationModalComponent } from './views/internal/contracts-registration-modal/contracts-registration-modal.component';
import { IconComponent } from './components/icon/icon.component';
import { DocumentsValidationComponent } from './views/internal/documents-validation/documents-validation.component';
import { DocumentValidationCardComponent } from './components/document-validation-card/document-validation-card.component';
import { EmployeeDocumentValidationCardComponent } from './components/employee-document-validation-card/employee-document-validation-card.component';
import { ContractInfoComponent } from './views/internal/contract-info/contract-info.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { SideBarItemComponent } from './components/side-bar/side-bar-item/side-bar-item.component';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { RefuseDocumentModalComponent } from './components/refuse-document-modal/refuse-document-modal.component';
import { FormFieldTemplatesComponent } from './views/internal/form-field-templates/form-field-templates.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    CompanyRegistrationComponent,
    DocTagComponent,
    SendDocCardComponent,
    PendingDocsComponent,
    ProfileComponent,
    UnauthenticatedLayoutComponent,
    AuthenticatedLayoutComponent,
    HomePageComponent,
    EmployeeSendDocCardComponent,
    ModalConfirmComponent,
    AddEmployeeComponent,
    RegisteredCompaniesComponent,
    SentDocsComponent,
    CompanyContractsComponent,
    BadgeComponent,
    OutsourcedCompanyContractsComponent,
    ContractFormFieldsComponent,
    FormFieldCardComponent,
    AddFormFieldComponent,
    ContractsRegistrationModalComponent,
    IconComponent,
    DocumentsValidationComponent,
    DocumentValidationCardComponent,
    EmployeeDocumentValidationCardComponent,
    ContractInfoComponent,
    TopBarComponent,
    SideBarComponent,
    SideBarItemComponent,
    RefuseDocumentModalComponent,
    FormFieldTemplatesComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 10000
    }),
    NgxMaskModule.forRoot(),
    AlifeFileToBase64Module,
    PopoverModule.forRoot(),
  ],
  providers: [
    FormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRefresherInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenSenderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
