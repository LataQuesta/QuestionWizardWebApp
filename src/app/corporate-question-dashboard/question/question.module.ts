import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuestionRoutingModule } from './question-routing.module';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxSliderModule } from '@m0t0r/ngx-slider';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    QuestionRoutingModule,
    MaterialModule,
    NgxSliderModule
  ]
})
export class QuestionModule { }
