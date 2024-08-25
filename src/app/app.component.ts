
import { Component, HostListener, OnInit } from '@angular/core';
import {   Router } from '@angular/router';
import {  Subscription } from 'rxjs';
import { CorporateUserService } from './CorporateService/corporate-user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Assessment';

  subscriptions: Subscription[] = [];

  connectionStatusMessage: string;
  connectionStatus: string;
  TestId : string;
  public href: string = "";
  subscription: Subscription;
  browserRefresh :any;
  BrowserName: string;

   

  constructor(private _router: Router,
    private _CoUserSvc : CorporateUserService) {

    


  }
  ngOnInit(): void {
    
  

    window.addEventListener("keyup", disableF5);
     window.addEventListener("keydown", disableF5);
   
    function disableF5(e) {
      
       if ((e.which || e.keyCode) == 116) e.preventDefault(); 
    };


    let url = this._router.url.split('/');
    this.TestId = url[url.length-1];
    this.BrowserName = this.getBrowserName();
    if (this.BrowserName === '') {
      this._CoUserSvc.RemoveLocalStorage();
      this._router.navigate(['/BrowserNotSupport']);
    }
   

  }

  public getBrowserName(): string {

    const agent = window.navigator.userAgent.toLowerCase()
    switch (true) {
      case agent.indexOf('edge') > -1:
        return 'edge';
      case agent.indexOf('opr') > -1 && !!(<any>window).opr:
        return 'opera';
      case agent.indexOf('chrome') > -1 && !!(<any>window).chrome:
        return 'chrome';
      case agent.indexOf('trident') > -1:
        return 'ie';
      case agent.indexOf('firefox') > -1:
        return 'firefox';
      case agent.indexOf('safari') > -1:
        return 'safari';
      default:
        return '';
    }
  }



  @HostListener('window:unload', ['$event'])
  unloadHandler(event) {
   
    let url = this._router.url.split('/');
    this.TestId = url[url.length-1];
   // var TestId = localStorage.getItem("TestId");
    this._CoUserSvc.UpdateCorporateIsLogin(this.TestId, false).
      subscribe((res: any) => {
        this._CoUserSvc.RemoveLocalStorage();
      });

  }

  @HostListener('window:beforeunload', ['$event'])
  beforeUnloadHandler(event) {

  }

}

