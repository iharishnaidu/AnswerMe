import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireComponent } from './modules/questionnaire/questionnaire.component';
import { OktaAuthGuard } from '@okta/okta-angular';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path : "questionnaire", component : QuestionnaireComponent, canActivate : [ OktaAuthGuard ]},
  { path : "dashboard", component : DashboardComponent, canActivate : [ OktaAuthGuard ] }
];

// Require authentication on every route
// routes.forEach(route => {
//   router.canActivate = router.canActivate || [];
//   route.canActivate.push(OktaAuthGuard);
// });

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
