import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModuleComponent } from './modules/login-module/login-module.component';
import { PerfilModuleComponent } from './modules/perfil-module/perfil-module.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginModuleComponent,
    PerfilModuleComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
