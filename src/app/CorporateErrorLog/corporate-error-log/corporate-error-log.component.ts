import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-corporate-error-log',
  templateUrl: './corporate-error-log.component.html',
  styleUrls: ['./corporate-error-log.component.css']
})
export class CorporateErrorLogComponent implements OnInit {

  TestId : string;
  constructor(private _route : ActivatedRoute) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe((params: ParamMap) => {
      this.TestId = params.get('Testid');
      localStorage.removeItem("TestId_"+this.TestId);
    localStorage.removeItem("userToken_"+this.TestId);
    });

   
  }

}
