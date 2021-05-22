import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service'
import { TokenInterceptorService } from '../../service/token-interceptor.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService:AuthService, 
              private  tokenStorage:TokenInterceptorService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isSignIn()) {
        this.router.navigateByUrl('/profile')
    }
  }

  onSubmit(): void {
    this.authService.signIn(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data);
        this.isLoggedIn = true;
        setTimeout(() => {
          this.router.navigateByUrl('/profile')
          }, 1000);  //1s
      },
      err => {
        this.errorMessage = err.error.error;
        this.isLoginFailed = true;
        setTimeout(() => {
        this.isLoginFailed = false;
        }, 3000);  //3s
      }
    );
  }
}
