import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const USER_API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getProfile():Observable<any> {
    return this.http.get(USER_API + 'profile/me', httpOptions);
  }

  updateProfile(form:any,profilePicture:File):Observable<any>{
    var formData: any = new FormData();
    formData.append("image",profilePicture);
    formData.append("firstName",form.firstName);
    formData.append("lastName", form.lastName);
    formData.append("email", form.email);
    formData.append("mobile", form.mobileNo);
    formData.append("username", form.username);
    return this.http.put(USER_API+'profile/update',formData,httpOptions)
  }

  getAllUser(page:number):Observable<any> {
    return this.http.get(USER_API + 'user?page=' + page, httpOptions);
  }
  
}
