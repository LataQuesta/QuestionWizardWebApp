import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service'


import { AppRoutingModule, routingComponent } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DeviceDetectorService } from 'ngx-device-detector';
import { GooleChart2Service } from './Global/goole-chart.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorporateDialogComponent } from './corporate-dialog/corporate-dialog.component';
import { BlockCopyPasteDirective } from './CorporateService/block-copy-paste.directive';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CountUpModule } from 'ngx-countup';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NgxSliderModule } from '@m0t0r/ngx-slider';
import { NgOtpInputModule } from 'ng-otp-input';
import { CorporateUserService } from './CorporateService/corporate-user.service';
import { CorporateQuestionService } from './CorporateService/corporate-question.service';
import { CorporateResolverService } from './CorporateService/Resolver/corporate.resolver.service';
import { CorporateAuthGuard } from './CorporateService/Guard/corporate-auth.guard';
import { CorporateDialogService } from './CorporateService/corporate-dialog.service';
import { CorporateErrorService } from './CorporateService/corporate-error.service';
import { CorporateMasterService } from './CorporateService/corporate-master.service';
import { ConnectionLostDialogComponent } from './corporate-dialog/connection-lost-dialog/connection-lost-dialog.component';
import { OTPDialogComponent } from './corporate-dialog/otpdialog/otpdialog.component';
import { InstructionPopUpComponent } from './corporate-dialog/instruction-pop-up/instruction-pop-up.component';
import { MaterialModule } from './material/material.module';
import { HttpCorporateErrorInterceptor } from './CorporateErrorLog/Interceptor/http-corporate-error.interceptor';
import { InternetInterceptor } from './CorporateErrorLog/Interceptor/Internet.interceptor';
import { UniversalDeviceDetectorService } from './Global/universal-device-detector.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponent,
    CorporateDialogComponent,
    BlockCopyPasteDirective,
    ConnectionLostDialogComponent,
    OTPDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatButtonModule,
    MatDialogModule,
    CountUpModule,
 /*   NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300
    }),*/
    NgOtpInputModule
  ],
  providers: [GooleChart2Service,
    CookieService,
    {
      provide: DeviceDetectorService,
      useClass: UniversalDeviceDetectorService
    },
    CorporateUserService,
    CorporateQuestionService,
    CorporateResolverService,
    CorporateAuthGuard,
    CorporateDialogService,
    CorporateErrorService,
    CorporateMasterService,
    { provide: HTTP_INTERCEPTORS, useClass: InternetInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpCorporateErrorInterceptor, multi: true },],
  entryComponents: [
    CorporateDialogComponent,
    ConnectionLostDialogComponent,
    OTPDialogComponent,
    InstructionPopUpComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
