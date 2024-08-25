import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable, OnInit } from '@angular/core';
import { take, map } from 'rxjs/operators';
import { CorporateUserService } from '../corporate-user.service';

@Injectable()
export class CorporateResolverService implements Resolve<any>{
    TestId: string;
    constructor(private _userSvc: CorporateUserService, private _router: Router) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        this.TestId = route.params.Testid;

        return this._userSvc.GetCorporateClaims(this.TestId).pipe(
            take(1),
            map((profile: any) => profile));
    }
}


