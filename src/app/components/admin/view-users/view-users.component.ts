import { Component, OnInit } from '@angular/core';
import {AdminloginService} from '../adminlogin.service';
import {DomSanitizer,SafeResourceUrl,SafeUrl} from '@angular/platform-browser';
@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
   data;
   users;
   logo;
  constructor(private adminLoginService : AdminloginService,private sanitizer: DomSanitizer) { }

  ngOnInit() {
    //  console.log(JSON.parse(localStorage.getItem('adminSaved')));
     
     this.adminLoginService.getAllUsers().subscribe(
          res => {
               this.users = res;
               //this.users =  this.data._body;
               //console.log(this.users);
              //this.extractData(res);
              //console.log(this.users._body);
          },
          error => {
              console.log(error);
          }
     );
    
  }

  extractData(res){
     this.users = res._body;
  }

}
