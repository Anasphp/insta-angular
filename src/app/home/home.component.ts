import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public header = true;

  constructor(private router:Router) { }

  ngOnInit() {
    this.checkAuth();
  }

  checkAuth() {
    if(localStorage.getItem('id') == null){
      this.router.navigate(['login']);
    }
  }

}
