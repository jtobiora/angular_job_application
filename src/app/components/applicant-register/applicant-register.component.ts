import { Component, OnInit } from '@angular/core';
import { User } from  '../../User';
import {Applicant} from '../../Applicant';
import { FormBuilder, FormGroup, Validators,FormControl } from '@angular/forms';
import {UploadService} from '../../services/upload.service';
import {HttpClient,HttpResponse,HttpEventType} from '@angular/common/http';
import {Http,RequestOptions,Headers} from '@angular/http';
import {map} from 'rxjs/operators';
import { Router } from "@angular/router";

@Component({
  selector: 'app-applicant-register',
  templateUrl: './applicant-register.component.html',
  styleUrls: ['./applicant-register.component.css']
})
export class ApplicantRegisterComponent implements OnInit {
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
  validPixExtensions = ['jpg','jpeg'];
  validResumeExtensions = ['pdf','docx','doc'];
  pixExtensions = null;
  pixSizeError = null;
  resumeUploadErr = null;
  resumeUploadSizeErr = null;
  checkCorrectPixUploads : boolean = false;
  checkCorrectResumeUploads : boolean = false;
  constructor(private fb:FormBuilder,private uploadService : UploadService,private http : Http,private router: Router ) { }

  ngOnInit() {
     this.regForm  = this.fb.group({
            email: ['',[Validators.required,
                        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
           
            firstName: new FormControl('',Validators.required),
            phoneNumber: new FormControl('',Validators.required),
            coverLetter: new FormControl('',Validators.required),
            surname: new FormControl('',Validators.required),
            file: new FormControl('',Validators.required),
            resume: new FormControl('',Validators.required),
            password: new FormControl('',[Validators.required, 
                           Validators.minLength(6)])             
        })
  }


    get email() { return this.regForm.get('email'); }
     
    get password() { return this.regForm.get('password'); }
 
    get firstName() { return this.regForm.get('firstName'); }

    get surname() { return this.regForm.get('surname'); }

    get phoneNumber() { return this.regForm.get('phoneNumber'); }

    get coverLetter() { return this.regForm.get('coverLetter'); }


  uploadPix(event){
     this.pixSizeError = null;
     this.pixExtensions = null;
    // if(event.target.files && event.target.files.length > 0) {
    //     this.fileList = event.target.files[0];
    // }
     //this.selectedFile = <File>event.target.files[0]; 
    this.selectedFiles = event.target.files;
    let file = this.selectedFiles[0];
    let fileName = file.name;
    let extension = fileName.split('.').pop();
      if(!this.validPixExtensions.includes(extension)){
          this.pixExtensions = 'The file you have selected is invalid';
          return;
      }
      if(file.size > 100000){
          this.pixSizeError = 'The file size has exceeded the limit!';
          return;
      }
        this.checkCorrectPixUploads = true;
  }

  uploadResume(event){
    this.resumeUploadErr = null;
    this.resumeUploadSizeErr = null;

    this.fileList = event.target.files;
    let file = this.fileList[0];
    let fileName = file.name;
    let extension = fileName.split('.').pop();
      if(!this.validResumeExtensions.includes(extension)){
          this.resumeUploadErr = 'The file you have selected is invalid';
          return;
      }
      if(file.size > 2000000){
          this.resumeUploadSizeErr = 'The file size has exceeded the limit!';
          return;
      }
      this.checkCorrectResumeUploads = true;
  }

  tryUpload(){
       this.err = null;


       //if the files selected are correct
       if(this.checkCorrectPixUploads && this.checkCorrectResumeUploads){
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
              this.http.post('http://localhost:9001/api/registerApplicants',formData, options)
                //.pipe(map((res) => res.json()))
                .subscribe(
                  data =>{
                    this.result = data;
                    console.log(this.result._body);
                    this.router.navigate(['/login'],{ queryParams: { created: 'We have received your application. Sign In here' } });
                  },
                  error =>{
                    this.err = error._body;
                    console.log(this.err);
                  }
                );
       } else {
            
       }

    
    // if(this.selectedFiles.length>0){
    //   this.applicant = this.regForm.value;
     
    //   let file: File = this.selectedFiles[0];
    //   let file2: File = this.fileList[0];
    //   let formData:FormData = new FormData();

    //   formData.append('file', file, file.name);
    //   formData.append('file2',file2,file2.name);
    //   formData.append('applicant', new Blob([JSON.stringify(this.applicant)],
    //     {
    //         type: "application/json"
    //     }));

    //   let headers = new Headers();
    //   //headers.append('Accept', 'application/json');
    //   let options = new RequestOptions({ headers: headers });
    //   this.http.post('http://localhost:9001/profile/uploadPicture',formData, options)
    //     //.pipe(map((res) => res.json()))
    //     .subscribe(
    //       data =>{
    //         this.result = data;
    //         console.log(this.result._body);
    //         this.router.navigate(['/login'],{ queryParams: { created: 'Your Account has been created. Sign In here' } });
    //       },
    //       error =>{
    //         this.err = error._body;
    //         console.log(this.err);
    //       }
    //     );
    // }  
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
