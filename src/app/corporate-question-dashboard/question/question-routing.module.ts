import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { InstructionPopUpComponent } from 'src/app/corporate-dialog/instruction-pop-up/instruction-pop-up.component';
import { CorporateErrorLogComponent } from 'src/app/CorporateErrorLog/corporate-error-log/corporate-error-log.component';
import { CorporateAuthGuard } from 'src/app/CorporateService/Guard/corporate-auth.guard';
import { CorporateResolverService } from 'src/app/CorporateService/Resolver/corporate.resolver.service';
import { CustomPipePipe } from 'src/app/Global/custom-pipe.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { ApptitudeQuestionTemplateComponent } from '../apptitude-question-template/apptitude-question-template.component';
import { CorporateAssessmentErrorComponent } from '../corporate-assessment-error/corporate-assessment-error.component';
import { CorporateCompleteTestComponent } from '../corporate-complete-test/corporate-complete-test.component';
import { CorporateQuestionDashboardComponent } from '../corporate-question-dashboard.component';
import { CorporateQuestionSetComponent } from '../corporate-question-set/corporate-question-set.component';
import { CorporateQuestionTableTemplateComponent } from '../corporate-question-table-template/corporate-question-table-template.component';
import { CorporateQuestionTemplateMobileComponent } from '../corporate-question-template-mobile/corporate-question-template-mobile.component';
import { CorporateQuestionTemplateComponent } from '../corporate-question-template/corporate-question-template.component';
import { CorporateQuestionWizardComponent } from '../corporate-question-wizard/corporate-question-wizard.component';
import { CorporateScoreComponent } from '../corporate-score/corporate-score.component';
import { PersonalityToPresenceQuestionTemplateComponent } from '../personality-to-presence-question-template/personality-to-presence-question-template.component';
import { QuestionDragAndDropTemplateComponent } from '../question-drag-and-drop-template/question-drag-and-drop-template.component';
import { StressandResilienceDesignTemplateComponent } from '../stressand-resilience-design-template/stressand-resilience-design-template.component';


const routes: Routes = [
  {
    path: '',
    component: CorporateQuestionDashboardComponent,
    children: [
      { path: '', component: CorporateQuestionWizardComponent }
    ],
    resolve: { list: CorporateResolverService },
    canActivate: [CorporateAuthGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule, NgxSliderModule],
  exports: [RouterModule],
  declarations: [
    CorporateQuestionWizardComponent,
    CorporateQuestionDashboardComponent,
    CorporateCompleteTestComponent,
    CorporateQuestionSetComponent,
    CorporateQuestionTableTemplateComponent,
    CorporateQuestionTemplateComponent,
    CorporateScoreComponent,
    CorporateAssessmentErrorComponent,
    InstructionPopUpComponent,
    ApptitudeQuestionTemplateComponent,CustomPipePipe,
    CorporateQuestionTemplateMobileComponent,
    QuestionDragAndDropTemplateComponent,
    PersonalityToPresenceQuestionTemplateComponent,
    StressandResilienceDesignTemplateComponent]
})
export class QuestionRoutingModule { }
