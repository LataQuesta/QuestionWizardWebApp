import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CountUpOptions } from 'countup.js';
import { ErrorHandlerService } from 'src/app/CorporateErrorLog/Service/error-handler.service';
import { CorporateQuestionSetStatusCode, QuestionIdStatus } from '../../CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from '../../CorporateService/corporate-question.service';

@Component({
  selector: 'app-corporate-question-set',
  templateUrl: './corporate-question-set.component.html',
  styleUrls: ['./corporate-question-set.component.css']
})
export class CorporateQuestionSetComponent implements OnInit {

  opts: CountUpOptions;
  @Input() CurrentTestId: number;
  LoadExamStatusCode : CorporateQuestionSetStatusCode[];
  TotalQuestion : number;
  NoOfQuestionComplete : number;
  ProgressSetId : number;
  CompletedQuestion : number;
  Width : number;
  

  constructor(private QuesSVC: CorporateQuestionService,private _router : Router,private _ErrorSvc : ErrorHandlerService) { }

  ngOnInit() {
    this.opts = {
      duration: 5,
      useEasing: false,
      useGrouping: false
    };
    this.loadExamStatusCode(this.CurrentTestId);
  }


  loadExamStatusCode(TestId) {
    this.QuesSVC.GetExamStatusCode(TestId).subscribe(
      data => {
        this.LoadExamStatusCode = Object.assign([], data.ExamStatusCode)
        if(this.LoadExamStatusCode.length == 7){
          this.Width=13.666667;
        }else{
          this.Width=16.666667;
        }
        this.TotalQuestion =data.NoOfQuestion;
        this.CompletedQuestion = data.NoOfQuestionComplete;
        this.NoOfQuestionComplete = Math.round((data.NoOfQuestionComplete * 100) / this.TotalQuestion);
        this.ProgressSetId = data.ProgressSetId;
      }
    );
  }


}
