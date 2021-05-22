import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profileData:any={}
  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(data => {
      this.profileData = data;
    },
    err => {
      if(err instanceof HttpErrorResponse){
        if(err.status === 401) {
          window.localStorage.clear();
          this.router.navigateByUrl('');
        }
      }
    });
  }
}