import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { CorporateUserService } from '../corporate-user.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateAuthGuard implements CanActivate {
  TestId: string;
  constructor(private _router :Router,private route: ActivatedRoute,private _userSvc : CorporateUserService){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     this.TestId = next.params.Testid;
      if(localStorage.getItem('userToken') != null){
        return true;
      } else {
        this._userSvc.RemoveLocalStorage();
        this._router.navigate(['/PageNotFound']);
        return false;
      }
  }
  
}
