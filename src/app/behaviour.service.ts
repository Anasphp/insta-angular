import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BehaviourService {

  private imagesource = new BehaviorSubject<string>('');
  telecast = this.imagesource.asObservable();

  private userName = new BehaviorSubject<string>('');
  userNameDetails = this.userName.asObservable();

  constructor() { }

  editUserImage(newImage) {
    this.imagesource.next(newImage);
  }

  changeUserName(newUserName) {
    this.userName.next(newUserName);
  }

}
