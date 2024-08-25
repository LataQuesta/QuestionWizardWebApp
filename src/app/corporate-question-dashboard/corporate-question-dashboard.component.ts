import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { CorporateDialogService } from '../CorporateService/corporate-dialog.service';
import { CorporateUserService } from '../CorporateService/corporate-user.service';

@Component({
  selector: 'app-corporate-question-dashboard',
  templateUrl: './corporate-question-dashboard.component.html',
  styleUrls: ['./corporate-question-dashboard.component.css']
})
export class CorporateQuestionDashboardComponent implements OnInit {

  userClaim: any;
  UserName: string;
  TestId: number;
  Name: string;
  AssessmentId: string;
  IsSubmenuOpen: boolean;
  @ViewChild('mySubMenu') mySubMenu: ElementRef;

  destroy = new Subject();
  timeLeft: number = 300;
  interval;


  IsLooseFocus: boolean;


  constructor(private _route: ActivatedRoute,
    private dialogService: CorporateDialogService,
    private _router: Router,
    private _userSvc: CorporateUserService) { 

     


    }

    

  ngOnInit() {

    this.userClaim = Object.assign({}, this._route.snapshot.data['list']);
    this.UserName = this.userClaim.userAuth.Username;
    this.TestId = this.userClaim.userAuth.TestId;
    this.Name = this.userClaim.userAuth.Name;
    this.AssessmentId = this.userClaim.userAuth.AssessmentId;

    this.IsSubmenuOpen = false;
    this.IsLooseFocus = false;

  }

  OpenSubmenu() {
    if (this.mySubMenu.nativeElement.classList.value === 'dropdown-menu dropdown-user animated fadeIn') {
      this.IsSubmenuOpen = true;
    } else {
      this.IsSubmenuOpen = false;
    }
  }
  openDialog() {
    this.IsSubmenuOpen = false;
    const options = {
      title: 'Hi ' +  this.Name[0].toUpperCase() + this.Name.substr(1).toLowerCase() + ',',
      message: 'Do you want to logout of the assessment?',
      cancelText: 'Log out',
      confirmText: 'Keep me logged in',
      IsInstrucation: false,
      id:'mat-SubMenu-Popup'
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe(confirmed => {
      if (!confirmed) {
        this._userSvc.RemoveLocalStorage();
        this._router.navigate(['/ClientRegister', this.TestId]);
      }
    });
  }


  @HostListener('window:focus', ['$event'])
  onFocus(event) {
    this.pauseTimer();
    this.timeLeft = 300;
    if (this.IsLooseFocus) {
      const options = {
        title: 'Hi ' + this.Name + ',',
        message: 'Do you want to logout of the assessment?',
        cancelText: 'Log out',
        confirmText: 'Keep me logged in',
        IsInstrucation: false,
        id:'mat-Timer-Popup'
      };

      this.dialogService.open(options);
      this.dialogService.confirmed().subscribe(confirmed => {
        if (confirmed) {
          this.IsLooseFocus = false;
        } else {
          this._userSvc.UpdateCorporateIsLogin(this.TestId, false).
            subscribe((res: any) => {
              if (res.isSuccess) {
                this._userSvc.RemoveLocalStorage();
                this._router.navigate(['/ClientRegister', this.TestId]);
              }
            })
        }
      });
    }
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event) {
    if (this.IsLooseFocus === false) {
      this.startTimer();
    } else {
      this.IsLooseFocus = true;
    }
  }



  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.IsLooseFocus = true;
      }
    }, 1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }


}
