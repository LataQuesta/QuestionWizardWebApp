import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './Global/page-not-found/page-not-found.component';
import { BrowserNotSupportComponent } from './Global/browser-not-support/browser-not-support.component';

import { CorporateQuestionWizardComponent } from './corporate-question-dashboard/corporate-question-wizard/corporate-question-wizard.component';
import { CorporateQuestionDashboardComponent } from './corporate-question-dashboard/corporate-question-dashboard.component';
import { CorporateRegisterComponent } from './corporate-register-layout/corporate-register/corporate-register.component';
import { CorporateRegisterLayoutComponent } from './corporate-register-layout/corporate-register-layout.component';
import { CorporateErrorLogComponent } from './CorporateErrorLog/corporate-error-log/corporate-error-log.component';
import { AccessGrantComponent } from './CorporateErrorLog/access-grant/access-grant.component';

const routes: Routes = [

  { path: '', pathMatch: 'full', component: PageNotFoundComponent },
  /* { path: 'Student', loadChildren: () => StudentModule },*/
  {
    path: 'ClientRegister/:Testid', loadChildren: () => import('./corporate-register-layout/Register/register-routing.module')
      .then(m => m.RegisterRoutingModule)
  },
  {
    path: 'QuestionSeries/:Testid', loadChildren: () => import('./corporate-question-dashboard/question/question-routing.module')
      .then(m => m.QuestionRoutingModule)
  },
  { path: 'BrowserNotSupport', component: BrowserNotSupportComponent },
  { path: 'PageNotFound', component: PageNotFoundComponent },
  { path: 'Error', component: CorporateErrorLogComponent },
  { path: 'AccessGrant', component: AccessGrantComponent },
  { path: '**', pathMatch: 'full', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent = [
  BrowserNotSupportComponent,
  PageNotFoundComponent,
  CorporateErrorLogComponent,
  AccessGrantComponent
]