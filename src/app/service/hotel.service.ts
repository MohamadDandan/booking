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
 getHotelById(id:string){
  return this.http.get<hotel>(this.basicURL+"/hotel/"+id);
 }
 getHotel(){
  return this.http.get<hotel[]>(this.basicURL+"/hotel");
 }
 deleteHotel(id:string){
  return this.http.delete(this.basicURL+"/hotel/"+id);
 }
}
