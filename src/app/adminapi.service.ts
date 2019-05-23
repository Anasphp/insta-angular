import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'multipart/form-data',
  })  
};

@Injectable({
  providedIn: 'root'
})
export class AdminapiService {
  apiURL: string = 'http://192.168.8.251:8000/admin/api';
  constructor(private httpClient:HttpClient) {
  
   }

   public getData(url, params = '') {
    return this.httpClient.get<any>(`${this.apiURL}/`+url+`/`+params);
   }

   public postData(data, url) {
    return this.httpClient.post<any>(`${this.apiURL}/`+url+`/`,data, httpOptions);
   }
}
