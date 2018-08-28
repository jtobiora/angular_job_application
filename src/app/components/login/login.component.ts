import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { ActivatedRoute,Router } from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email : string;
  password : string;
  inputs : any;
  accountCreated: string = null;
  error = null;
  result = null;
  success = null;
  constructor(private loginService : LoginService,private activatedRoute: ActivatedRoute,private router: Router) {
    
   }

  ngOnInit() {
     this.activatedRoute.queryParams
      .pipe(filter(params => params.created))
      .subscribe(params => {
        console.log(params); 

        this.accountCreated = params.created;
        console.log(this.accountCreated); 
      });
  }

  login(){
     this.loginService.validateAccount(this.email,this.password)
          .subscribe(
               res => {
                  this.result = res;
                  this.success = this.result._body;
                  console.log(this.success);
                  localStorage.setItem('name',this.success);
                  this.router.navigate(['/profile']);
               },
               err => {
                   this.error = err._body;
                   console.log(this.error);
               }
          );
  }

}
