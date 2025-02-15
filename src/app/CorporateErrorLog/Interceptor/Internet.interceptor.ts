import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CorporateDialogService } from 'src/app/CorporateService/corporate-dialog.service';

@Injectable()
export class InternetInterceptor implements HttpInterceptor {
    constructor(private dialogService: CorporateDialogService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // check to see if there's internet
        if (!window.navigator.onLine) {
            // if there is no internet, throw a HttpErrorResponse error
            // since an error is thrown, the function will terminate here
           // return Observable.throw(new HttpErrorResponse({ error: 'Internet is required.' }));

            const options = {
                message: 'THERE IS NO INTERNET CONNECTION',
                src: 'assets/img/NoInternet.jpg',
                IsOkBtn: false
              };
              this.dialogService.OpenCloseConnection(options);


        } else {
            // else return the normal request
            return next.handle(request);
        }
    }
}