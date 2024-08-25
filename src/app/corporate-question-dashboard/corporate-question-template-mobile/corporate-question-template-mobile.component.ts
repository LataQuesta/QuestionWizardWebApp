import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/CorporateErrorLog/Service/error-handler.service';
import { CorporateQuestion, CorporateQuestionBM } from '../../CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from '../../CorporateService/corporate-question.service';
import { CorporateQuestionSetComponent } from '../corporate-question-set/corporate-question-set.component';

@Component({
  selector: 'app-corporate-question-template-mobile',
  templateUrl: './corporate-question-template-mobile.component.html',
  styleUrls: ['./corporate-question-template-mobile.component.css']
})
export class CorporateQuestionTemplateMobileComponent implements OnInit {

  @Input() Question: CorporateQuestionBM;
  loading = false;
  CurrentTestId: number;
  @ViewChild(CorporateQuestionSetComponent, { static: false }) childC: CorporateQuestionSetComponent;
  error : string;
  TxnQuestionResponseText : string;
  TxnQuestionResponseId : number;
  constructor(private QuesSVC: CorporateQuestionService,
    private _router: Router, private _ErrorSvc : ErrorHandlerService) { }
                                  
  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

 
  RetrunQuestionResponseId(lstQuestion: CorporateQuestion,Index : number) : number{
    let lstQuestionResponse = lstQuestion.lstQuestionRes;
    this.TxnQuestionResponseId = lstQuestionResponse[Index].ResponseId;
    return this.TxnQuestionResponseId;
  }

  NextAndSaveQuestion() {
    
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SaveLoadNextQuestionModel(this.Question).subscribe(
      data => {
        IsSuccess = data.isSucess;
        if (IsSuccess) {
          this.Question = Object.assign({}, data.QuestionModel)
          this.CurrentTestId = this.Question.TestId;
          this.childC.ngOnInit();
          this.loading = false;
        }
      });
  }

  saveQuestion() {
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SubmitCurrentSetofQuestionModel(this.Question).subscribe(
      data => {
        IsSuccess = data.isSuccess;
        if (IsSuccess) {
          this.Question = Object.assign({}, data.QuestionModel)
          // this.CurrentTestId = this.Question.TestId;
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/QuestionSeries', this.Question.TestId]);

          this.loading = false;
        }
      });
  }



}
