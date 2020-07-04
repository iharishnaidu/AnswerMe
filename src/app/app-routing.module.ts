import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionnaireComponent } from './modules/questionnaire/questionnaire.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { OktaAuthGuard } from '@okta/okta-angular';

const CALLBACK_PATH = 'implicit/callback';
const routes: Routes = [
  { path : "questionnaire", component : QuestionnaireComponent, canActivate : [ OktaAuthGuard ]},
  { path: CALLBACK_PATH, component: OktaCallbackComponent }
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
