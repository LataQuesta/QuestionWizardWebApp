import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { InstructionPopUpComponent } from 'src/app/corporate-dialog/instruction-pop-up/instruction-pop-up.component';
import { ErrorHandlerService } from 'src/app/CorporateErrorLog/Service/error-handler.service';
import { CorporateDialogService } from 'src/app/CorporateService/corporate-dialog.service';
import { CorporateQuestionBM } from '../../CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from '../../CorporateService/corporate-question.service';

@Component({
  selector: 'app-corporate-question-wizard',
  templateUrl: './corporate-question-wizard.component.html',
  styleUrls: ['./corporate-question-wizard.component.css']
})
export class CorporateQuestionWizardComponent implements OnInit,OnDestroy {

  userClaim: any;
  SessionTestId: number;
  CurrentTestId: number;
  CurrentSetId: number;
  Question: CorporateQuestionBM;
  IsQuestionDisplay: boolean;
  IsTestComplete: boolean;
  IsAssessmentError : boolean;
  IsScordBoardDisplay: boolean;
  error: string;

  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;
  errorMessage : string;
 
  constructor(private _route: ActivatedRoute,
    private QuesSVC: CorporateQuestionService,
    private dialogService: CorporateDialogService,
    private _router: Router, private _ErrorSvc : ErrorHandlerService,public dialog: MatDialog) { 

     

    }

  ngOnInit() {
    
    debugger
    this.userClaim = Object.assign({}, this._route.snapshot.data['list']);
    this.SessionTestId = this.userClaim.userAuth.TestId;

    this._route.paramMap.subscribe((params: ParamMap) => {
      let id = parseInt(params.get('Testid'));
      this.CurrentTestId = id;
      if (this.CurrentTestId !== this.SessionTestId) {
        this._router.navigate(['/QuestionSeries', this.SessionTestId]);
      }
      this.CurrentTestId = this.SessionTestId;
      this.CurrentSetId = this.userClaim.userAuth.SetId;
    });
    this.loadQuestionModel(this.CurrentTestId, this.CurrentSetId);
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
  

  loadQuestionModel(TestId, SetId) {
    this.QuesSVC.LoadQuestionModel(TestId, SetId).subscribe(
      data => {
        this.Question = Object.assign({}, data.QuestionModel)
        if(this.Question.IsDisplayInstruction){
          this.dialog.open(InstructionPopUpComponent,{ data: { SetId: this.Question.CurrentSetId },});
        }
        this.IsQuestionDisplay = this.Question.IsQuestionDisplay;
        this.IsTestComplete = this.Question.IsTestComplete;
        this.IsAssessmentError = this.Question.IsAssessmentError;
        this.IsScordBoardDisplay = this.Question.IsScordBoardDisplay


        


      }
    );

  }


}
