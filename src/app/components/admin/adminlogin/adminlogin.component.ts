import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import {filter} from 'rxjs/operators';
import {AdminloginService} from '../adminlogin.service';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent implements OnInit {
  email : string;
  password : string;
  inputs : any;
  accountCreated: string = null;
  error = null;
  result = null;
  success = null;
  allApplicants;
  data = null;
  show : boolean= false;
   constructor(private activatedRoute: ActivatedRoute,private router: Router,private loginService: AdminloginService) {
    
   }

  ngOnInit() {
  }

  login(){
     this.loginService.validateAccount(this.email,this.password)
          .subscribe(
               res => {
                  this.result = res;
                  this.success = this.result._body;
                  localStorage.setItem('adminSaved',JSON.parse(JSON.stringify(this.success)));  
                 
                  this.router.navigate(['/viewusers']);
                 
               },
               err => {
                   this.error = err._body;
                   console.log(this.error);
               }
          );
  }

}
