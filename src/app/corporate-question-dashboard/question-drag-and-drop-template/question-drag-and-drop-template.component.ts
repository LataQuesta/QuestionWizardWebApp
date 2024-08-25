import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CorporateQuestionBM, CorporateQuestionResponse } from 'src/app/CorporateModel/CorporateQuestionModel';
import { CorporateQuestionService } from 'src/app/CorporateService/corporate-question.service';
import { CorporateQuestionSetComponent } from '../corporate-question-set/corporate-question-set.component';

@Component({
  selector: 'app-question-drag-and-drop-template',
  templateUrl: './question-drag-and-drop-template.component.html',
  styleUrls: ['./question-drag-and-drop-template.component.css']
})
export class QuestionDragAndDropTemplateComponent implements OnInit {

 
  @Input() Question: CorporateQuestionBM;
  loading = false;
  CurrentTestId: number; 
  QuestionResponse : CorporateQuestionResponse[];
  @ViewChild(CorporateQuestionSetComponent, { static: false }) childC: CorporateQuestionSetComponent;

  constructor(private QuesSVC: CorporateQuestionService,
              private _router: Router) { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }
  
  drop(event: CdkDragDrop<string[]>,QuestionResponse : CorporateQuestionService[]) {
    moveItemInArray(QuestionResponse, event.previousIndex, event.currentIndex);
  }

  GetSubTypeName(index : number) {
    var  SubTypeData = this.Question.lstSubType;
    let SubTypeName;
    var filteredObj = SubTypeData.find(function(item, i){
      if(i === index){
        SubTypeName = item.SubTypeName;
      }
    });
    return SubTypeName;
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
