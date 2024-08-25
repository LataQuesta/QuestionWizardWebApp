import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class CorporateErrorService {

  public rooturl = environment.apiEndpoint;
  constructor(private _http: HttpClient) { }

    SaveCorporateErrorLog(Error: any): Observable<any> {
      const headers = new HttpHeaders().set('content-type', 'application/json');
      var body = {
          Message: Error.ErrorMessage,
          ErrorMsg: Error.ErrorCode,
          RequestMethod: Error.RequestMethod,
          RequestUri: Error.Message
      }
      let options = {
        headers: headers
      }
      return this._http.post<any>(this.rooturl + '/api/CorporateErrorHandler/SaveCorporateErrorLog', body, options);
    }

    
}
