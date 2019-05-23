import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from './api.service';
import {Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  public header = true;
  constructor(private apiService: ApiService,private router: Router){

  }

  ngOnInit(){
  }

  changeOfRoutes() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      const url = this.router.url;
      if(url.includes('register') || url.includes('login')|| url.includes('demo')) {
        this.header = false;
      } else {
        this.header = true;
      }
    })
  }

}
