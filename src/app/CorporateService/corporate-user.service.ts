import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { CorporateRegisterModel } from '../CorporateModel/CorporateRegisterModel';

import { ErrorHandlerService } from '../CorporateErrorLog/Service/error-handler.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CorporateUserService {
  //public rooturl = 'http://questaenneagram-env.eba-72jbmwnf.ap-south-1.elasticbeanstalk.com';
  public rooturl = environment.apiEndpoint;//this.config.apiEndpoint;
  constructor(private _http: HttpClient) { }

  GetCorporateCandiateData(TestId): Observable<any> {
    return this._http.get<any>(this.rooturl + '/api/CorporateUser/GetCandiateData' + '/' + TestId);
  }

  CorporateAuthencation(username, password) {
    var data = "username=" + username + "&password=" + password + "&grant_type=password";
    var reqheader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded' });
    return this._http.post(this.rooturl + '/token', data, { headers: reqheader });
  }

  SaveCorporateDetails(User: CorporateRegisterModel): Observable<any> {
    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      UserId: User.UserId,
      TestId: User.TestId,
      Title: User.Title,
      FirstName: User.FirstName,
      LastName: User.LastName,
      UserEmail: User.UserEmail,
      PhoneNumber: User.PhoneNumber,
      UserGender: User.UserGender,
      UserAge: User.UserAge,
      State: User.State,
      Country: User.Country,
      Qualification: User.Qualification,
      Professional: User.Professional,
      GenderTxt: User.GenderTxt,
      MaritalStatus: User.MaritalStatus,
      Industry: User.Industry,
      QualificationTxt: User.QualificationTxt,
      EmployeeStatus: User.EmployeeStatus,
      IsActive: User.IsActive,
      IsMobileDevice: User.IsMobileDevice,
      IsDesktopDevice: User.IsDesktopDevice,
      IsTabDevice: User.IsTabDevice,
      BrowserName: User.BrowserName,
      DateOfBirth : User.DateOfBirth,
      Experience : User.Experience
    }
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/CorporateUser/SaveCandidateDetails', body, options);
  }


  GetCorporateClaims(TestId: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };
    return this._http
      .get<any>(this.rooturl + "/api/CorporateUser/GetUserClaim", httpOptions);
  }

  UpdateCorporateIsLogin(TestId, IsLogin): Observable<any> {
    return this._http.get<any>(this.rooturl + '/api/CorporateUser/UpdateIsLogin' + '/' + IsLogin + '/' + TestId);
  }

  RemoveLocalStorage() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('TestId');
  }

  GetOTP(PhoneNumber, email): Observable<any> {


    const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = {
      email: email,
      PhoneNumber: PhoneNumber
    }
    let options = {
      headers: headers
    }
    return this._http.post<any>(this.rooturl + '/api/CorporateUser/GetOTP', body, options);

  }

}
