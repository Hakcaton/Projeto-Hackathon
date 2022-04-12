import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationComponent } from './views/common/authentication/authentication.component';
import { LoginComponent } from './views/common/authentication/login/login.component';
import { ForgotPasswordComponent } from './views/common/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './views/common/authentication/reset-password/reset-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    TooltipModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    FormBuilder,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenRefresherInterceptor,
      multi: true   
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenSenderInterceptor,
      multi: true   
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true   
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
