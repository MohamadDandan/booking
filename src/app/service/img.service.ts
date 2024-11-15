import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { imgURL, imgURL_updat, pic } from '../dataType';

@Injectable({
  providedIn: 'root'
})
export class ImgService {

  basicURL=environment.basicURL;
  constructor(private http:HttpClient) { }
  
  create_IMG(data:pic){
    return this.http.post(this.basicURL+"/hotel_picture",data);
  }
  getImg(){
    return this.http.get<pic[]>(this.basicURL+"/hotel_picture");
  }
  updateImg(data:imgURL_updat){
    return this.http.patch(this.basicURL+"/hotel_picture/"+data.id, data);
  }
}
