import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-instruction-pop-up',
  templateUrl: './instruction-pop-up.component.html',
  styleUrls: ['./instruction-pop-up.component.css']
})
export class InstructionPopUpComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

}
