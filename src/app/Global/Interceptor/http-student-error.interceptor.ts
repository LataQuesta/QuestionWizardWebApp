import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { CorporateErrorService } from 'src/app/CorporateService/corporate-error.service';

@Injectable()

export class HttpGlobalErrorInterceptor implements HttpInterceptor {

  constructor(
    private _router: Router,
    private CoErrorSvc : CorporateErrorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let errorMessage = '';
          var ErrorLog = {};
          if (error.error instanceof ErrorEvent) {
            // client-side error
            ErrorLog = { Message: error.message, RequestMethod: error.error.type }
            errorMessage = `Error: ${error.error.message}`;
          } else {
            ErrorLog = {
              ErrorMessage: error.error.ExceptionMessage,
              Message: error.message,
              RequestMethod: error.url,
              ErrorCode: error.status,
              ExceptionType: error.error.ExceptionType,
              StackTrace: error.error.StackTrace
            }
            // server-side error
            errorMessage = `ErrorMessage: ${error.error.ExceptionMessage}\nError Code: ${error.status}\nMessage: ${error.message}\nType:${error.type}`;
          }
          let url = this._router.url.split('/')

          if (url[1] === 'Student') {
            /*this.ErrorSvc.SaveStudentErrorLog(ErrorLog).subscribe(data => {
              this._router.navigate(['/Error']);
            }, (err: HttpErrorResponse) => {
              this._router.navigate(['/Error']);
              window.alert(errorMessage);
            })*/
          } else if (url[1] === 'Corporate') {
            this.CoErrorSvc.SaveCorporateErrorLog(ErrorLog).subscribe(data => {
              this._router.navigate(['/Error']);
            }, (err: HttpErrorResponse) => {
              this._router.navigate(['/Error']);
              window.alert(errorMessage);
            })
          }



          //window.alert(errorMessage);
          return throwError(errorMessage);

        })
      )
  }
}