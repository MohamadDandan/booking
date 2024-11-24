import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { room, room_detail } from '../dataType';

@Injectable({
  providedIn: 'root'
})

export class RoomService {
basicURL=environment.basicURL
  constructor(private http:HttpClient) { }

 createRoom(data:room){
  return this.http.post<room>(this.basicURL+"/rooms",data);
 }
 getRoomsByHotel_Id(id:string){
  return this.http.get<room_detail[]>(this.basicURL+"/rooms/"+id+"/data");
 }
}
