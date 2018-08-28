import { Component, OnInit } from '@angular/core';
import { User } from  '../User';
import {Applicant} from '../Applicant';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {UploadService} from '../services/upload.service';
import {HttpClient,HttpResponse,HttpEventType} from '@angular/common/http';
import {Http,RequestOptions,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private user : User;
  private applicant : Applicant;
  regForm: FormGroup;
  fileList : FileList;
  // selectedFile : File = null;
  selectedFiles : FileList;
  currentFileUpload : File;
  progress: { percentage: number } = { percentage: 0 }
  result;
  err = null;
  validPixExtensions = ['jpg','png','jpeg'];
  pixExtensions = null;
  constructor(private fb:FormBuilder,private uploadService : UploadService,private http : Http,private router: Router ) { }

  ngOnInit() {
     this.regForm  = this.fb.group({
            username: ['',[Validators.required,
                        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
           
            name: new FormControl('',Validators.required),
            file: new FormControl('',Validators.required),
            resume: new FormControl('',Validators.required),
            password: new FormControl('',[Validators.required, 
                           Validators.minLength(6)]),
            confPassword: new FormControl('',[Validators.required, 
                           Validators.minLength(6)])               
        })
  }


    get username() { return this.regForm.get('username'); }
     
    get password() { return this.regForm.get('password'); }
 
    get name() { return this.regForm.get('name'); }


    submit(){
        

        // if(this.regForm.valid) {
        //         let file: File = this.fileList[0];
        //          console.log(this.fileList);
        //         let formData:FormData = new FormData();
        //         // formData.append('uploadFile', file, file.name);
                
        //         this.user = this.regForm.value;
            
        //   // console.log(this.fileList);
            
        // }

       // const fd = new FormData();
       // fd.append('image',this.selectedFile,this.selectedFile.name);
         

       this.progress.percentage = 0;
 
       this.currentFileUpload = this.selectedFiles.item(0)
       this.user = this.regForm.value;
     
      //  this.uploadService.pushFileToStorage(this.currentFileUpload).subscribe(event => {
      //     if (event.type === HttpEventType.UploadProgress) {
      //       this.progress.percentage = Math.round(100 * event.loaded / event.total);
      //     } else if (event instanceof HttpResponse) {
      //       console.log('File is completely uploaded!');
      //     }
      //   });
 
      //    //this.selectedFiles = undefined

        this.uploadService.pushFileToStorage(this.currentFileUpload,null).subscribe(
          data => {
             if(data instanceof HttpResponse){
                console.log('File completely uploaded');
             }           
          },
         error => {
              console.log(error);
         });
 
         this.selectedFiles = undefined
    }

  fileChange(event){
    // if(event.target.files && event.target.files.length > 0) {
    //     this.fileList = event.target.files[0];
    // }
     //this.selectedFile = <File>event.target.files[0]; 
    this.selectedFiles = event.target.files;
  }
  fileChange2(event){
      this.fileList = event.target.files;
  }

  tryUpload(){
    if(this.selectedFiles.length>0){
      this.applicant = this.regForm.value;
     
      let file: File = this.selectedFiles[0];
      let file2: File = this.fileList[0];
      let formData:FormData = new FormData();

      formData.append('file', file, file.name);
      formData.append('file2',file2,file2.name);
      formData.append('applicant', new Blob([JSON.stringify(this.applicant)],
        {
            type: "application/json"
        }));

      let headers = new Headers();
      //headers.append('Accept', 'application/json');
      let options = new RequestOptions({ headers: headers });
      this.http.post('http://localhost:9001/profile/uploadPicture',formData, options)
        //.pipe(map((res) => res.json()))
        .subscribe(
          data =>{
            this.result = data;
            console.log(this.result._body);
            this.router.navigate(['/login'],{ queryParams: { created: 'Your Account has been created. Sign In here' } });
          },
          error =>{
            this.err = error._body;
            console.log(this.err);
          }
        );
    }
  }



  validateFile(file){
         //check file extension
      let fileName = file.name;
      let extension = fileName.split('.').pop();
      if(!this.validPixExtensions.includes(extension)){
          this.pixExtensions = 'The file you have selected is invalid';
      }
      
  }

}
