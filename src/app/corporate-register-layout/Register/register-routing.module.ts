import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material/material.module';
import { CorporateRegisterLayoutComponent } from '../corporate-register-layout.component';
import { CorporateRegisterComponent } from '../corporate-register/corporate-register.component';
import { NgxCaptchaModule } from 'ngx-captcha';

const routes: Routes = [
  {
    path: '',
    component: CorporateRegisterLayoutComponent,
    children: [
      { path: '', component: CorporateRegisterComponent }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    NgxCaptchaModule
  ],
  declarations: [
    CorporateRegisterComponent,
    CorporateRegisterLayoutComponent
  ],
  exports: [RouterModule]
})
export class RegisterRoutingModule { }
