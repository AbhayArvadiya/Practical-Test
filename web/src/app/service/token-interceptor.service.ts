import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AuthService } from '../service/auth.service';
const TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req:HttpRequest<any>, next:HttpHandler){
    let authService=this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization: `Bearer ${authService.getToken()}`
      }
    })
    return next.handle(tokenizedReq)
  }

  public saveToken(token: any): void {
    window.localStorage.clear();
    window.localStorage.setItem(TOKEN_KEY, token.authToken);
  }
}
