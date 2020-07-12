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
import { OktaAuthModule } from '@okta/okta-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuizreviewComponent } from './quizreview/quizreview.component';
import { TopicdialogComponent } from './topicdialog/topicdialog.component';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent,
    NavbarComponent,
    HeaderComponent,
    DashboardComponent,
    QuizreviewComponent,
    TopicdialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    OktaAuthModule,
    AuthRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [TopicdialogComponent]
})
export class AppModule { }
