import { Injectable } from "@angular/core";

@Injectable()
export class Globals {

constructor() {};

userImageUrl: string = 'http://localhost/task/api/public/images/users/';
imageUrl: string = 'http://localhost/task/api/public/images/';
defaultImage: string = '../assets/assets/img/users/default.png';
userImage:string = '';

}