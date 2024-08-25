import { Component, Input, OnInit } from '@angular/core';
import { CorporateQuestionBM } from '../../CorporateModel/CorporateQuestionModel';

@Component({
  selector: 'app-corporate-complete-test',
  templateUrl: './corporate-complete-test.component.html',
  styleUrls: ['./corporate-complete-test.component.css']
})
export class CorporateCompleteTestComponent implements OnInit {

  @Input() Question: CorporateQuestionBM;
  CurrentTestId: number;
  constructor() { }

  ngOnInit() {
    this.CurrentTestId = this.Question.TestId;
  }


}
