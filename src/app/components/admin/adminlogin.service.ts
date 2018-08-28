import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {map} from 'rxjs/operators';
import {Admin} from '../../Admin';

@Injectable({
  providedIn: 'root'
})
export class AdminloginService {
  
  private isloggedIn: boolean = false;
  private loggedInUser: Admin;
  constructor(private http : Http) { }

  validateAccount(email : string, password : string) {
    //let user = JSON.parse(localStorage.getItem('user_info'));
    let data = { email : email, password : password};
    return this.fetchResultSet('http://localhost:9001/api/admin/login', JSON.stringify(data));
  }

  fetchResultSet(url: string, jsonString: string) {
    let headers      = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json'});
    let options       = new RequestOptions({ headers: headers });
        return this.http.post(url,jsonString,options);
  }

  getAllUsers(){
    return this.http.get('http://localhost:9001/api/getAllApplicants').pipe(map(response => response.json()));
  }

  isAdminAuthenticated(){
      let admin : Admin = JSON.parse(localStorage.getItem('adminSaved'));
      //let admin : Admin=  localStorage.getItem('adminSaved');
      if(admin !== null){
          this.loggedInUser = admin;
          this.isloggedIn = true;
      }
      return this.isloggedIn;
  }

  getLoggedInUser(): Admin {
		return this.loggedInUser;
  }
  
  logoutUser(): void{
		this.isloggedIn = false;
	}

}
