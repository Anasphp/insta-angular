import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../api.service';


const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
  })  
};

@Component({
  selector: 'demo-root',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent {
  constructor(private httpClient: HttpClient, private api : ApiService,) { }
  title = 'angular-image-upload';
  public postTitle:any;
  public description:any;
  public image:any;
  formdata = new FormData();

  onImageSelected(event) {
    this.image = event.target.files[0];
  }

  onSubmit(event: Event){
    event.preventDefault();
  
    this.formdata.append('file_name', this.image);
    this.formdata.append('description', this.description);
    this.formdata.append('userId', '1');
    this.formdata.append('title', this.postTitle);
    this.api.postData(this.formdata,'createPost').subscribe(data => {
      console.log(data);

    });
    
  }

  foo() {
    return 1;
  }

  // bar() {
  //   console.log('hello');
  // }
}

