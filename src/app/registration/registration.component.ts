import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastrService } from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  // url = '';
  firstNameValue: any;
  lastNameValue: any;
  emailValue: any;
  passwordValue: any;
  confirmPasswordValue: any;

  constructor(private apiService: ApiService,private toastr: ToastrService, private router: Router) { }

  ngOnInit() {
    // this.url = localStorage.getItem('image');
  }

  userRegistration() {
    if(!this.emailValue || !this.passwordValue || !this.firstNameValue || !this.lastNameValue || !this.confirmPasswordValue) {
      this.toastr.error('Please fill all the fields');
      return false;
    }

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
    if(this.passwordValue.length >= 6) {
      passwordCheck = true;
    } else {
      this.toastr.error("Password Should be in atleast 6 Characters");
      return false;
    }

    if(this.passwordValue == this.confirmPasswordValue) {
      passwordCheck = true;
    } else {
      passwordCheck = false;
      this.toastr.error("Password is not yet Match");
    }
    
    if(this.firstNameValue != '' && this.firstNameValue != '' && mailCheck && passwordCheck) {
      let data={"name":this.firstNameValue +" "+ this.lastNameValue, "email" :this.emailValue, "password" :this.passwordValue};
      this.apiService.postData(data, 'register').subscribe((data => {
       if(data.error == false) {
        this.toastr.success(data.message, 'Hi '+this.firstNameValue +" "+ this.lastNameValue);
        this.firstNameValue = this.lastNameValue = this.emailValue = this.passwordValue = '';
        this.router.navigateByUrl('/login');
       } else {
        this.toastr.error(data.message);
       }
      }));
    } 
  }
}
