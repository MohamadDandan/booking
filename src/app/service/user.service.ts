import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  userUpdate } from '../dataType';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  basicURL=environment.basicURL;
  constructor(
    private http: HttpClient,
  ) { }
 
  getUsers(){
    return this.http.get(this.basicURL+"/user");
  }
  getUsersCustomes(){
    return this.http.get(this.basicURL+"/user_custom");
  }
  updateUser(user:userUpdate) {

    return this.http.patch<userUpdate>(this.basicURL+"/user/"+user.id, user);
  }
}
