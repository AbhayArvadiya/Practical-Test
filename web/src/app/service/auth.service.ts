import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';


const httpOptions = {
  // headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const AUTH_API = 'http://localhost:8080/api/auth/';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,private router: Router) { }

  signIn(signInCredential:any) {
    return this.http.post(AUTH_API + 'signin', signInCredential, httpOptions);
  }

  signUp(signUpCredential:any) {
    return this.http.post(AUTH_API + 'signup', signUpCredential, httpOptions);
  }

  isSignIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }

  logout(){
    window.localStorage.removeItem('token')
    this.router.navigateByUrl('');
  }


}
