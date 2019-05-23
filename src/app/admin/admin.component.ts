import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminapiService } from '../adminapi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  serialNo = 0;
  allUsers:any;
  userId:any;
  userNameEdit:any;
  emailEdit:any;
  firstName:string;
  lastName:string;
  userEmail:any;
  password:any;
  confirmPassword:any;


  constructor(private adminApiService: AdminapiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.listAllUsers();
  }

  listAllUsers() {
    this.adminApiService.getData('listAllUsers').subscribe( data => {
      this.allUsers = data.data;
    });
  }

  appendEdit(user){
    this.userId = user.id;
    this.userNameEdit = user.name;
    this.emailEdit = user.email;
  }

  editUsers() {
    let data = {"id":this.userId,"name":this.userNameEdit};
    this.adminApiService.postData(data,'editUser').subscribe(data => {
      if(data.error == false) {
        this.listAllUsers();
        let element:HTMLElement = document.getElementById('closeModal') as HTMLElement;
        element.click();
        this.toastr.success(data.message);
       } else {
        this.toastr.error(data.message);
       }
    });
  }

  deleteUser(id) {
    if(confirm("Are you sure to delete "+name)) {
      let data = {"id":id};
      this.adminApiService.postData(data,'deleteUser').subscribe(data => {
        if(data.error == false) {
          this.listAllUsers();
          this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }

  createUsers() {
    let mailCheck = false;
    let passwordCheck = false;
    if(this.userEmail != undefined) {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(this.userEmail.match(mailformat)){
        mailCheck = true;
      } else {
        this.toastr.error("Invalid Mail Format");
      }
    }

    if(this.password != undefined) {
      if(this.password.length >= 6) {
        passwordCheck = true;
      } else {
        passwordCheck = false;
        this.toastr.error("Password Should be in atleast 6 Characters");
      }
    } 

    if(this.password == this.confirmPassword) {
      passwordCheck = true;
    } else {
      passwordCheck = false;
      this.toastr.error("Password is not yet Match");
    }

    if(!this.firstName || !this.lastName || !this.userEmail || !this.password || !this.confirmPassword) {
      this.toastr.error('Please fill all the fields');
    } 

    if(this.firstName != '' && this.lastName != '' && mailCheck && passwordCheck) {
      let data = {"name":this.firstName +" "+ this.lastName, "email":this.userEmail, "password":this.password}
      this.adminApiService.postData(data,'createUser').subscribe(data => {
        if(data.error == false) {
          let element:HTMLElement = document.getElementById('createModalClose') as HTMLElement;
          element.click();
         this.toastr.success(data.message);
        } else {
          this.toastr.error(data.message);
        }
      });
    }
  }

}
