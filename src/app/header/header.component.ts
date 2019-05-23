import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Globals } from '../globals';
import { BehaviourService } from '../behaviour.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public userName:string;
  public activeHeader:any = "stories";
  public checkUser;
  public userImage;
  public defaultImage;
  public imageUrl;
  public userImageUrl;

  constructor(private router:Router, private globals: Globals,private behaviour: BehaviourService, private apiService: ApiService) {
   }

  ngOnInit() {
    this.behaviour.telecast.subscribe(newImageUrl => {
      if(newImageUrl != '') {
        this.userImage = newImageUrl;
      }
    });
    this.behaviour.userNameDetails.subscribe(newUserName => {
      if(newUserName != '') {
        this.userName = newUserName;
      }
    });
    this.getProfileDetails();
    this.checkUser = localStorage.getItem("category");
    this.userImage = this.globals.userImage;
    this.defaultImage = this.globals.defaultImage;
    this.imageUrl = this.globals.imageUrl;
    this.userImageUrl = this.globals.userImageUrl;
  }

  getProfileDetails() {
    this.apiService.getData('profileDetails',localStorage.getItem("id")).subscribe(data => {
      this.updateUserName(data.data.name);
      this.userName = data.data.name;
      if(data.data.image_url != '') {
        this.userImage = data.data.image_url;
        this.globals.userImage = this.userImage;
      }
    });
  }

  checkActiveRoute(header) {
    this.activeHeader = header;
    // let data = event.target.closest('mint-green').find();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

  updateUserName(newUserName) {
    this.behaviour.changeUserName(newUserName);
  }

}
