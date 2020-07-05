import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { QuestionnaireComponent } from './modules/questionnaire/questionnaire.component';
import { NavbarComponent } from './modules/navbar/navbar.component';
import { HeaderComponent } from './modules/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import {
  OKTA_CONFIG,
  OktaAuthModule,
} from '@okta/okta-angular';
import { DashboardComponent } from './dashboard/dashboard.component';


const config = {
  clientId: '0oaifrq9yQym6Q3pj4x6',
  issuer: 'https://dev-741648.okta.com/oauth2/default',
  redirectUri: 'http://localhost:4200/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    NavbarComponent,
    HeaderComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [{ provide: OKTA_CONFIG, useValue: config }],
  bootstrap: [AppComponent]
})
export class AppModule { }
