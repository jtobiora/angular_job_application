import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {map} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http : Http) { }

  validateAccount(email : string, password : string) {
    //let user = JSON.parse(localStorage.getItem('user_info'));
    let data = { email : email, password : password};
    return this.fetchResultSet('http://localhost:9001/api/login', JSON.stringify(data));
  }

  fetchResult(apiUrl: string, jsonString: string) {
    
    return this.http.post(apiUrl, jsonString)
    .pipe(map((res) => res.json()));
      
  }

  fetchResultSet(url: string, jsonString: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options       = new RequestOptions({ headers: headers });
        return this.http.post(url,jsonString,options);
  }
}
