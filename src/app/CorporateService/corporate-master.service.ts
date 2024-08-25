import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorHandlerService } from '../CorporateErrorLog/Service/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class CorporateMasterService {

  baseUrl = environment.apiEndpoint;
  
  constructor(private _http: HttpClient) { }

  GetCorporateMasterData(): Observable<any> {
    debugger
    return this._http.get<any>(this.baseUrl + '/api/CorporateUser/GetMaster');
  }

  GetCorporateStateData(CountryId): Observable<any> {
    return this._http.get<any>(this.baseUrl + '/api/CorporateUser/GetState' + '/' + CountryId);
  }

}
