import { Component, ComponentFactoryResolver, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { ErrorHandlerService } from 'src/app/CorporateErrorLog/Service/error-handler.service';
import { CorporateQuestionBM } from 'src/app/CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from 'src/app/CorporateService/corporate-question.service';
import { CorporateQuestionSetComponent } from '../corporate-question-set/corporate-question-set.component';

@Component({
  selector: 'app-apptitude-question-template',
  templateUrl: './apptitude-question-template.component.html',
  styleUrls: ['./apptitude-question-template.component.css']
})
export class ApptitudeQuestionTemplateComponent implements OnInit,OnDestroy {

  @Input() Question: CorporateQuestionBM;
  loading = false;
  CurrentTestId: number;
  @ViewChild(CorporateQuestionSetComponent, { static: false }) childC: CorporateQuestionSetComponent;
  error : string;

  intervalId = 0;
  seconds: number = 1800;
  textSec: any = "0";
  statSec: number = 60;
   message : any;
   cFactory : any;
   componentRef : any;

  constructor(private QuesSVC: CorporateQuestionService,
    private _router: Router) {
     }
    
  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;

    var Sec= localStorage.getItem('Apptitude Timer');

    if(Sec !== null && Sec !== undefined){
      this.seconds = parseInt(Sec);
    }


    this.start();
  }
  ngOnDestroy() { 
    this.clearTimer(); 
  }

  clearTimer() { 
    clearInterval(this.intervalId); 
  }
  
  start() { 
    this.countDown(); 
  }


  private countDown() {
    this.clearTimer();
 
    
    const timer = setInterval(() => {

      this.seconds--;

      var h = Math.floor(this.seconds / 3600);
      var m = Math.floor(this.seconds % 3600 / 60);
      var s = Math.floor(this.seconds % 3600 % 60);
  
      var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
      var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes ") : "";
      var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  
      this.message = hDisplay + mDisplay + sDisplay; 
      
      localStorage.setItem('Apptitude Timer',this.seconds.toString());
      if (this.seconds === 0) {
        clearInterval(timer);
        this.saveQuestion();
      }
    }, 1000);
  }

  NextAndSaveQuestion() {
    let IsSuccess;
    this.loading = true;
    this.Question.CurrentQuestionId = this.Question.NextQuestion;
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
  PrevAndSaveQuestion(){
    let IsSuccess;
    this.loading = true;
    this.Question.CurrentQuestionId = this.Question.PrevQuestion;
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

  QuestionOpen(QuestionId : any){
    let IsSuccess;
    this.loading = true;
    this.Question.CurrentQuestionId = QuestionId;
    this.QuesSVC.LoadCurrentQuestion(this.Question).subscribe(
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
    localStorage.removeItem('Apptitude Timer');
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
