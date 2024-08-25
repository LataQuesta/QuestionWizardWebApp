import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomStepDefinition, LabelType, Options } from '@m0t0r/ngx-slider';
import { CorporateQuestion, CorporateQuestionBM, CorporateQuestionResponse } from 'src/app/CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from 'src/app/CorporateService/corporate-question.service';
import { CorporateQuestionSetComponent } from '../corporate-question-set/corporate-question-set.component';

@Component({
  selector: 'app-personality-to-presence-question-template',
  templateUrl: './personality-to-presence-question-template.component.html',
  styleUrls: ['./personality-to-presence-question-template.component.css']
})
export class PersonalityToPresenceQuestionTemplateComponent implements OnInit {
  @Input() Question: CorporateQuestionBM;
  loading = false;
  CurrentTestId: number;
  TxnQuestionResponseText: string;
  TxnQuestionResponseId: number;
  QuestionResponse : CorporateQuestionResponse[];
  @ViewChild(CorporateQuestionSetComponent, { static: false }) childC: CorporateQuestionSetComponent;
  constructor(private QuesSVC: CorporateQuestionService,
    private _router: Router) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }

  alphabet: string = 'Left 4,Left 3,Left 2,Left 1,0,Right 1,Right 2,Right 3,Right 4';
  value: number = this.letterToIndex('0');
  value1: number = this.letterToIndex('0');
  options: Options = {
    stepsArray: this.alphabet.split(',').map((letter: string): CustomStepDefinition => {
      return { value: this.letterToIndex(letter) };
    }),
    translate: (value: number, label: LabelType): string => {
      
      return this.indexToLetter(value);
    },
    showTicks: true,
    showTicksValues: true
  };

  indexToLetter(index: number): string {
    var Idx;
    var posNum ;
    posNum = (index < 0) ? index * -1 : index;
    if(index > 0){
      Idx = 'Left ' +index;
    } else if(index  === 0){
      Idx = '0';
    } else {
      Idx = 'Right '+index;
    }
   // var Idx = this.alphabet[index];
    //var arr = Idx.split(" ");
    return posNum;
  }

  letterToIndex(letter: string): number {
    var position;
    if( letter === 'Left 4'){
      position = -4;
    }
    else if( letter === 'Left 4'){
      position = -4;
    }
    else if( letter === 'Left 3'){
      position = -3;
    }
    else if( letter === 'Left 2'){
      position = -2;
    }
    else if( letter === 'Left 1'){
      position = -1;
    }
    else if( letter === '0'){
      position = 0;
    }
    else if( letter === 'Right 1'){
      position = 1;
    }
    else if( letter === 'Right 2'){
      position = 2;
    }
    else if( letter === 'Right 3'){
      position = 3;
    }
    else if( letter === 'Right 4'){
      position = 4;
    }
   // let di = this.alphabet.indexOf(letter);
    return position;
  }

  valueChange(lstQuestionModel: CorporateQuestion){
    this.QuestionResponse = lstQuestionModel.lstQuestionRes;
    if(lstQuestionModel.Rating < 0){
      lstQuestionModel.ResponseValue = this.QuestionResponse[0].ResponseId;
    }else if(lstQuestionModel.Rating > 0){
      lstQuestionModel.ResponseValue = this.QuestionResponse[1].ResponseId;
    }else if(lstQuestionModel.Rating == 0){
      lstQuestionModel.ResponseValue = null;
    }
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
