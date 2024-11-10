import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { hotel } from '../dataType';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  basicURL=environment.basicURL;
 constructor(private http: HttpClient){}

 createHotel(data:hotel){
  return this.http.post<hotel>(this.basicURL+"/hotel",data);
 }
}
