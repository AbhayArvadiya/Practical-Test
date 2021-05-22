import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service'



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoggedIn:Boolean=false;

  constructor(public authService:AuthService){}

  ngOnInit(): void {}

  logout(){
    this.authService.logout();
  }
}
