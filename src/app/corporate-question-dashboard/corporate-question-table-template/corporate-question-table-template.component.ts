import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandlerService } from 'src/app/CorporateErrorLog/Service/error-handler.service';
import { CorporateQuestion, CorporateQuestionBM } from '../../CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from '../../CorporateService/corporate-question.service';
import { CorporateQuestionSetComponent } from '../corporate-question-set/corporate-question-set.component';

@Component({
  selector: 'app-corporate-question-table-template',
  templateUrl: './corporate-question-table-template.component.html',
  styleUrls: ['./corporate-question-table-template.component.css']
})
export class CorporateQuestionTableTemplateComponent implements OnInit {
  @Input() Question: CorporateQuestionBM;
  loading = false;
  CurrentTestId: number;
  TxnQuestionResponseText : string;
  TxnQuestionResponseId : number;
  @ViewChild(CorporateQuestionSetComponent, { static: false }) childC: CorporateQuestionSetComponent;
  constructor(private QuesSVC: CorporateQuestionService,
              private _router: Router,private _ErrorSvc : ErrorHandlerService) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

  RetrunQuestionResponseText(lstQuestion: CorporateQuestion,Index : number) : string{
    let lstQuestionResponse = lstQuestion.lstQuestionRes;
    this.TxnQuestionResponseText = lstQuestionResponse[Index].ResponseText;
    return this.TxnQuestionResponseText;
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

  saveQuestion(): void {
    let IsSuccess;
    this.loading = true;
    this.QuesSVC.SubmitCurrentSetofQuestionModel(this.Question).subscribe(
      data => {
        IsSuccess = data.isSuccess;
        if (IsSuccess) {
          this.Question = Object.assign({}, data.QuestionModel)
          this._router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
          }
          this._router.onSameUrlNavigation = 'reload';
          this._router.navigate(['/QuestionSeries', this.Question.TestId]);

          this.loading = false;
        }
      }
    );
  }

}
