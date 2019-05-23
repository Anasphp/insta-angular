import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';
import { Globals } from '../globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  emailValue: any;
  passwordValue: any;
  constructor(private apiService: ApiService,private toastr: ToastrService,private router: Router,private globals: Globals) { }

  ngOnInit() {
  }

  helloWorld() {
    return 'Hello world!';
  }

  userRegistration(e) {
    let mailCheck = false;
    let passwordCheck = false;
    if(this.emailValue) {
      var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(this.emailValue.match(mailformat)){
        mailCheck = true;
      } else {
        this.toastr.error("Invalid Mail Format");
        return false;
      }
    } 

    if(!this.emailValue || !this.passwordValue) {
      this.toastr.error("Please fill all the fields");
      return false;
    }
    



    if(this.emailValue != '' && this.passwordValue != '') {
      let data={"email" :this.emailValue, "password" :this.passwordValue};
      this.apiService.postData(data,'login').subscribe((data => {
        // this.globals.name = data.data.name;
        this.globals.userImage = data.data.image_url;
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('email', data.data.email);
        localStorage.setItem('image', data.data.image_url);
        localStorage.setItem('token',data.token);
        localStorage.setItem('category', data.data.category);
        localStorage.setItem('created_at', data.data.created_at);
       if(data.error == false) {
        this.toastr.success(data.message);
        if(data.data.category == 0) {
          this.router.navigate(['/stories'])
        } else {
          this.router.navigate(['/admin'])
        }
       } else {
        this.toastr.error(data.message);
       }
      }));
    } else {
        this.toastr.error('Please fill all the fields');
    }
  }
}
