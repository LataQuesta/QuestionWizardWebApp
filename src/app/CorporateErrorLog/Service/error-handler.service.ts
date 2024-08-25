import { Injectable, Inject } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable, fromEvent, merge, Observer } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import { CorporateDialogService } from 'src/app/CorporateService/corporate-dialog.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  public rooturl = environment.apiEndpoint;
  constructor(private _http: HttpClient,
    private _router: Router,
    private dialogService: CorporateDialogService) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      // errorMessage =`Message : ${error.message}`
      errorMessage = `ErrorMessage: ${error.error.ExceptionMessage}\nError Code: ${error.status}\nMessage: ${error.message}\nType:${error.type}`;
    }
    // window.alert(errorMessage);
    return throwError(error);
  }

  SaveErrorLogInDb(ErrorMessage: HttpErrorResponse): Observable<any> {

    
    let data = {
      "Message": ErrorMessage.error,
      "ErrorMsg": ErrorMessage.message,
      "RequestMethod": ErrorMessage.status,
      "RequestUri": ErrorMessage.url,
      "TimeUtc": null
    };
    let body = JSON.stringify(data)
    const headers = new HttpHeaders().set('content-type', 'application/json');
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/CorporateErrorHandler/SaveCorporateErrorLog', body, options);
  }


  RedirectErrorPage(ErrorMessage: HttpErrorResponse,TestId: any) {

    this.SaveErrorLogInDb(ErrorMessage).subscribe(data => { 
      this._router.navigate(['/Error', TestId]);
    },error => {
      this._router.navigate(['/Error', TestId]);
    })
    
  }

  /**createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }));
  }**/




}
