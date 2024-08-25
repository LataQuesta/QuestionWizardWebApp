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
import { ErrorHandlerService } from '../Service/error-handler.service';


@Injectable()

export class HttpCorporateErrorInterceptor implements HttpInterceptor {

  constructor(private ErrorSvc: ErrorHandlerService,
    private _router: Router) { }

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
          this.ErrorSvc.SaveErrorLogInDb(error).subscribe(data => { 
            this._router.navigate(['/Error']);

            if(error.status === 401){
              this._router.navigate(['/Error']);
            }

          },error => {
            window.alert('Please check internet connectivity');
          })


          //window.alert(errorMessage);
          return throwError(errorMessage);

        })
      )
  }
}