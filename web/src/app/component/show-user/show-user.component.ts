import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.css']
})
export class ShowUserComponent implements OnInit {

  usersList: any = [];
  userData:any;
  pageSize:number=8;
  collectionSize:number=0;
  currentPage: number = 1;

  constructor(private userService:UserService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.readUsers(this.currentPage);
  }

  open(content:any,userdata:any) {
    this.userData=userdata;
    this.modalService.open(content);
  }

  readUsers(pageNo: number) {
    this.userService.getAllUser(pageNo-1).subscribe(data => {
      console.log(data)
      this.collectionSize = data.totalUsers;
      this.usersList = data.users;
    },
    err => {
      console.log("No user added at")
    });
  }

}
