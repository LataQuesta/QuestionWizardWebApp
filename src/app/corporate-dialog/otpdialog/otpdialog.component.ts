import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { CorporateUserService } from 'src/app/CorporateService/corporate-user.service';

@Component({
  selector: 'app-otpdialog',
  templateUrl: './otpdialog.component.html',
  styleUrls: ['./otpdialog.component.css']
})
export class OTPDialogComponent implements OnInit {
  
  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;
  
  config = {
    allowNumbersOnly: true,
    length: 5,
    isPasswordInput: false,
    disableAutoFocus: false,
    placeholder: '',
    inputStyles: {
      'width': '50px',
      'height': '50px'
    }
  };
  countDown;
  count;
  IsResendBtn : boolean;
  OTPRecieve : number;
  OTPEnter : number;
  IsSubmitbtn : boolean;
  Error : string;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _router: Router,
              private _userSvc: CorporateUserService,
              private dialogRef: MatDialogRef<OTPDialogComponent>) { }
  

  ngOnInit(): void {
    this.count = 300;
    this.startTimer();
    this.IsSubmitbtn = true;
    this._userSvc.GetOTP(this.data.MobileNo,this.data.email).subscribe(data => { 
      if(data.IsSend){
          this.OTPRecieve = data.OTPNumber;
          console.log( data.OTPNumber)
        } else {
          this.Error = data.Log;
        }
    })
  }
  
  onOtpChange(otp) {
    //alert(otp)
    if(otp.length == 5){
      this.IsSubmitbtn = false;
      this.OTPEnter = otp;
    } else {
      this.IsSubmitbtn = true;
    }
    
  }
  
  startTimer(){
    this.countDown = setInterval(() => {
      if(this.count > 0){
        this.count--;
      } else if(this.count == 0){
        if(Number(this.OTPEnter) !== this.OTPRecieve){
          this.IsResendBtn = true;
        }
      }
    },1200)
  }

  Submit(){
    if(Number(this.OTPEnter) === this.OTPRecieve){
      this.dialogRef.close({ data: 'true' })
    } else {
      this.Error ="Please enter valid OTP";
    }
  }

  Resend(){
    this.ngOtpInput.setValue('');
    this._userSvc.GetOTP(this.data.MobileNo,this.data.email).subscribe(data => {
        if(data.IsSend){
          this.OTPRecieve = data.OTPNumber;
          this.IsSubmitbtn = true;
          this.IsResendBtn = false;
          this.count = 300;
        }
    })
  }

}
