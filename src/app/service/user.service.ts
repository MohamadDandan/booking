import { user } from './../dataType';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  adminUpdate, userUpdate } from '../dataType';

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
  delete(id:number){
    return this.http.delete(this.basicURL+"/user/"+id);
  }
  updateByAdmin(user:adminUpdate){
    return this.http.patch<adminUpdate>(this.basicURL+"/user_custom/"+user.id, user);
  }
  updateUser(user:userUpdate) {

    return this.http.patch<userUpdate>(this.basicURL+"/user/"+user.id, user);
  }
  
}
