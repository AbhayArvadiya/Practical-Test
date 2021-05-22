import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from "@angular/router";
import { from } from 'rxjs';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  form: any = {};
  profilePicture:any;
  isSuccessful = false;
  isFailed = false;
  errorMessage = '';

  getProfilePicture:any;
  imageFlag = false;
  imageFileType = false;

  constructor(private userService:UserService,private router: Router) { }

  ngOnInit(): void {
    this.userService.getProfile().subscribe(data => {
      this.form = {
        "firstName": data.user.first_name,
        "lastName": data.user.last_name,
        "email": data.user.email,
        "mobileNo": data.user.phone,
        "username": data.user.username,
      }
      this.profilePicture= data.user.profile_image
    },
    err => {
      this.router.navigateByUrl('');
    });
  }

  upload(event:any){
    
    const file:File = event.target.files[0];

    if (file.size > 1000000) //in bytes
      this.imageFlag = true;
    else
      this.imageFlag = false;

    if (file.type == "image/png" || file.type == "image/jpeg" || file.type == "image/jpg" || file.type == "image/webp") {
      this.imageFileType = false;
      const reader=new FileReader();
      reader.onload=()=>{
        this.profilePicture=reader.result as string;
      }
      reader.readAsDataURL(file);
      this.getProfilePicture=file;
    }
    else
      this.imageFileType = true;
  }

  onSubmit(): void {
    this.userService.updateProfile(this.form,this.getProfilePicture).subscribe(
      data => {
        this.isSuccessful = true;
        this.isFailed = false;
        this.router.navigateByUrl('/profile');
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      });
    }

}
