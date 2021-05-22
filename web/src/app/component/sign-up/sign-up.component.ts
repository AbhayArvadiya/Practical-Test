import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authService.signUp(this.form).subscribe(data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(() => {
              this.router.navigateByUrl('')
          }, 2000);
      },
      err => {
        this.errorMessage = err.error.error;
        this.isSignUpFailed = true;
        setTimeout(() => {
          this.isSignUpFailed = false;
          }, 5000); 
      });
    }
}
