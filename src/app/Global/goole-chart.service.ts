import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
declare var google: any;

@Injectable({
  providedIn: 'root'
})
export class GooleChart2Service {
  
  private google : any;
  constructor(private _router: Router) { 
    try{
      this.google = google;
    } catch(error){
      window.alert(error);
    }
    
  }

  getGoogle(){
    return this.google;
  }

}
