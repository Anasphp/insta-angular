import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from './users';

const httpOptions = {
    headers: new HttpHeaders({
      // 'Content-Type': 'multipart/form-data',
    })  
  };
@Injectable({
  providedIn: 'root'
})

export class ApiService {
public firstPage: string = "";
public prevPage: string = "";
public nextPage: string = "";
public lastPage: string = "";

  apiURL: string = 'http://192.168.8.251:8000/api';
  constructor(private httpClient: HttpClient) { }

  public getData(url, params = '') {
    return this.httpClient.get<any>(`${this.apiURL}/`+url+`/`+params);
  }

  public postData(data, url) {
    // return this.httpClient.get<any>(`${this.apiURL}/userlists`);
    return this.httpClient.post<any>(`${this.apiURL}/`+url+`/`,data);
  }

  public listAllPosts() {
    return this.httpClient.get<any>(`${this.apiURL}/listAllPosts/`+localStorage.getItem("id"));
  }

  public getProfileDetails() {
    return this.httpClient.get<any>(`${this.apiURL}/profileDetails/`+localStorage.getItem("id"));
  }
  
  public updateProfileImage(image) {
    var formdata = new FormData();
    formdata.append('profile_image', image);
    formdata.append('user_id', localStorage.getItem("id"));
    return this.httpClient.post<any>('http://192.168.8.251:8000/api/profileImage', formdata, httpOptions);
  }
  


}
