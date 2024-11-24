import { Component, OnInit, signal } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { hotel, imgURL_updat, room, room_detail } from '../../dataType';
import { RoomService } from '../../service/room.service';
import { ImgService } from '../../service/img.service';

@Component({
  selector: 'app-on-process-menu',
  templateUrl: './on-process-menu.component.html',
  styleUrl: './on-process-menu.component.css'
})
export class OnProcessMenuComponent implements OnInit {

  name=localStorage.getItem('getHotelName');
  id=localStorage.getItem('getHotelId');
  hotel: hotel|undefined;
  rooms:room_detail[]=[];
  img: imgURL_updat[] = [];
  panelOpenState_hotel = signal(false);
  panelOpenState_room = signal(false);
  panelOpenState_img = signal(false);
  constructor(
    private hotelService: HotelService,private roomService: RoomService,
    private imgService: ImgService,
  ) { }
  ngOnInit(): void {
    if(this.id){
    this.hotelService.getHotelById(this.id).subscribe(hotelData => {
   this.hotel = hotelData;
  })
  this.roomService.getRoomsByHotel_Id(this.id).subscribe(roomsData => {
    this.rooms = roomsData;
  });
  this.imgService.getImgByHotel(this.id).subscribe(imgData => {
    this.img = imgData;
  });
}
  }


}
