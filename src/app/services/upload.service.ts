import { Injectable } from '@angular/core';
import {HttpClient,HttpRequest,HttpEvent} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../User';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private url : string = 'http://localhost:9001/profile/uploadPicture';
  constructor(private http: HttpClient) { }

  pushFileToStorage(file : File, user : User) : Observable<HttpEvent<{}>>{
     const formData : FormData = new FormData();
     formData.append('file',file);
     formData.append('user',JSON.stringify(user));
     const req = new HttpRequest('POST',this.url,formData,{
        reportProgress: true,
        responseType : 'text'
     });
        return this.http.request(req);
  }
}
