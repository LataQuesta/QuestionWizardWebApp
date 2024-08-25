import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CorporateQuestionBM } from '../CorporateModel/CorporateQuestionModel';
import { ErrorHandlerService } from '../CorporateErrorLog/Service/error-handler.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CorporateQuestionService {
  //public rooturl = 'http://questaenneagram-env.eba-72jbmwnf.ap-south-1.elasticbeanstalk.com';
  public rooturl = environment.apiEndpoint;//this.config.apiEndpoint;
  constructor(private _http: HttpClient) { }

  LoadQuestionModel(TestId, SetId): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };

     return this._http.get<any>(this.rooturl + '/api/CorporateQuestion/LoadInitialQuestionModel'+'/'+TestId+'/'+SetId,httpOptions);
  }

  GetExamStatusCode(TestId): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };
     return this._http.get<any>(this.rooturl + '/api/CorporateQuestion/GetQuestionSetStatusCode'+'/'+TestId,httpOptions);
  }

  SaveLoadNextQuestionModel(QuestionData: CorporateQuestionBM): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };

   // const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
  //  let options = {
  //    headers: headers
  //  }
    return this._http.post<any>(this.rooturl + '/api/CorporateQuestion/SaveLoadNextQuestion', body, httpOptions);
  }

  LoadCurrentQuestion(QuestionData: CorporateQuestionBM): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };

  //  const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
   // let options = {
  //    headers: headers
  //  }
    return this._http.post<any>(this.rooturl + '/api/CorporateQuestion/LoadCurrentQuestion', body, httpOptions);
  }

  SubmitCurrentSetofQuestionModel(QuestionData: CorporateQuestionBM): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };

   // const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
  //  let options = {
  //    headers: headers
   // }
    return this._http.post<any>(this.rooturl + '/api/CorporateQuestion/SubmitSetofQuestion', body, httpOptions);
  }
  SaveLoadNextSubModule(QuestionData: CorporateQuestionBM): Observable<any> {

    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };


  //  const headers = new HttpHeaders().set('content-type', 'application/json');
    var body = Object.assign({}, QuestionData)
  //  let options = {
  //    headers: headers
  //  }
    return this._http.post<any>(this.rooturl + '/api/CorporateQuestion/SaveLoadNextSubModule', body, httpOptions);
  }
  SaveAndNextSetOpen(data : any): Observable<any> {

    let body = JSON.stringify(data)
    
   // const headers = new HttpHeaders().set('content-type', 'application/json');
   // let options = {
  //    headers: headers
  //  }
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };

    return this._http.post<any>(this.rooturl + '/api/CorporateQuestion/SaveAndNextSetOpen', body, httpOptions);
  }

  CompleteUserTest(data : any): Observable<any> {
    let body = JSON.stringify(data)
    
    const httpOptions = {
      headers: new HttpHeaders({
        'content-type': 'application/json',
        'Authorization': 'bearer ' + localStorage.getItem('userToken')
      })
    };

  //  const headers = new HttpHeaders().set('content-type', 'application/json');
  //  let options = {
  //    headers: headers
  //  }
     return this._http.post<any>(this.rooturl + '/api/CorporateQuestion/CompleteCorporateTest', body, httpOptions);
  }




}
