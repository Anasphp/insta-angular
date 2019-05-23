import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';
import { ApiService } from '../api.service';
import { Globals } from '../globals';
import { BehaviourService } from '../behaviour.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input('incomingmsg') newrandmsg: string;

  message: string;
  editedmsg: string;

  public username:any;
  public userImage:any = '';
  public imageUrl:string;
  public defaultImage:string;
  userNameEdit:any;
  emailEdit:any;
  
  constructor(private router:Router,private apiService: ApiService,private globals: Globals,private behaviour: BehaviourService, private toastr: ToastrService) {
   }

  ngOnInit() {
    this.checkAuth();
    this.getProfileDetails();
    this.defaultImage = this.globals.defaultImage;
    this.imageUrl = this.globals.userImageUrl;
  }

  checkAuth() {
    if(localStorage.getItem('id') == null){
      this.router.navigate(['login']);
    }
  }

  getProfileDetails() {
    this.apiService.getData('profileDetails',localStorage.getItem("id")).subscribe(data => {
      this.username = data.data.name;
      if(data.data.image_url != '') {
        this.userImage = data.data.image_url;
        this.globals.userImage = this.userImage;
        localStorage.setItem("image",this.userImage);
      }
    });
  }

  chooseProfileImage() {
    let element : HTMLElement = document.getElementById('profileImage') as HTMLElement;
    element.click();
  }

  onImageSelected(event) {
    var formdata = new FormData();
    formdata.append('profile_image', event.target.files[0]);
    formdata.append('user_id', localStorage.getItem("id"));
    this.apiService.postData(formdata,'profileImage').subscribe(data => {
      this.getProfileDetails();
      this.updateUserImage(data.data.image_url);
    });
  }

  updateUserImage(newImage) {
    this.behaviour.editUserImage(newImage);
  }

  appendEdit(){
    this.userNameEdit = this.username;
    this.emailEdit = localStorage.getItem('email');
  }

  editUsers() {
    let data = {"id":localStorage.getItem('id'),"name":this.userNameEdit};
    this.apiService.postData(data,'editUser').subscribe(data => {
      if(data.error == false) {
        this.getProfileDetails();
        this.behaviour.changeUserName(this.userNameEdit);
        let element:HTMLElement = document.getElementById('closeModal') as HTMLElement;
        element.click();
        this.toastr.success(data.message);
       } else {
        this.toastr.error(data.message);
       }
    });
  }

}
