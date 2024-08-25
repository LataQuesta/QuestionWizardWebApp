import { Component, Input, OnInit } from '@angular/core';
import { CorporateQuestionBM } from 'src/app/CorporateModel/CorporateQuestionModel';

@Component({
  selector: 'app-corporate-assessment-error',
  templateUrl: './corporate-assessment-error.component.html',
  styleUrls: ['./corporate-assessment-error.component.css']
})
export class CorporateAssessmentErrorComponent implements OnInit {

  @Input() Question: CorporateQuestionBM;
  CurrentTestId: number;
  constructor() { }

  ngOnInit(): void {
    this.CurrentTestId = this.Question.TestId;
  }

}
