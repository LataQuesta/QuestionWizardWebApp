import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { CorporateRegisterComponent } from '../corporate-register/corporate-register.component';
import { CorporateRegisterLayoutComponent } from '../corporate-register-layout.component';
import { AppComponent } from 'src/app/app.component';
import { MaterialModule } from 'src/app/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MaterialModule
  ]
})
export class QuestionModule { }
