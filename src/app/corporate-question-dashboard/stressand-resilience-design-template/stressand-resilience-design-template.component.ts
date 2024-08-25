import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup,  } from '@angular/forms';
import { Router } from '@angular/router';
import { CorporateQuestionBM } from 'src/app/CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from 'src/app/CorporateService/corporate-question.service';
import { multipleCheckboxRequireOne } from 'src/app/Global/Require-Validator.directive';
import { CorporateQuestionSetComponent } from '../corporate-question-set/corporate-question-set.component';

@Component({
  selector: 'app-stressand-resilience-design-template',
  templateUrl: './stressand-resilience-design-template.component.html',
  styleUrls: ['./stressand-resilience-design-template.component.css']
})
export class StressandResilienceDesignTemplateComponent implements OnInit {

  @Input() Question: CorporateQuestionBM;
  loading = false;
  CurrentTestId: number;
  @ViewChild(CorporateQuestionSetComponent, { static: false }) childC: CorporateQuestionSetComponent;
  error: string;
  TxnQuestionResponseText: string;
  TxnQuestionResponseId: number;

  
  fg: FormGroup;


  constructor(private QuesSVC: CorporateQuestionService,
    private _router: Router,private fb: FormBuilder) { }

    getControls() {
      return (this.fg.get('QuestionResponse') as FormArray).controls;
    }
 

  onSubmit() {
    console.log(this.fg);
  }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;


    this.fg = this.fb.group({
      QuestionResponse: this.fb.array(
        this.Question.lstQuestionModel[0].lstQuestionRes.map(() => this.fb.control('')),
        multipleCheckboxRequireOne
      )
    });


  }

  ChangeQuestionRes(QuestionResponseId, e) {
    if (QuestionResponseId === 3567) {
      // do something here
      if (e.target.checked) {
        for (var i = 0; i < this.Question.lstQuestionModel[0].lstQuestionRes.length; i++) {
          if (this.Question.lstQuestionModel[0].lstQuestionRes[i].ResponseId !== QuestionResponseId) {
            this.Question.lstQuestionModel[0].lstQuestionRes[i].Disable = true;
            this.Question.lstQuestionModel[0].lstQuestionRes[i].Checked = false;
          }
        }
      }
      else {
        for (var i = 0; i < this.Question.lstQuestionModel[0].lstQuestionRes.length; i++) {
          this.Question.lstQuestionModel[0].lstQuestionRes[i].Disable = false;
          this.Question.lstQuestionModel[0].lstQuestionRes[i].Checked = false;
        }
      }

    }

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
