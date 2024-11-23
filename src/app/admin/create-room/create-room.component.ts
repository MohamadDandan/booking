import { room } from './../../dataType';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { imgURL, imgURL_updat, pic } from '../../dataType';
import { ToastrService } from 'ngx-toastr';
import { ImgService } from '../../service/img.service';
import { RoomService } from '../../service/room.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrl: './create-room.component.css'
})
export class CreateRoomComponent implements OnInit {
firstRoomForm: any;
secondRoomForm: any;
thirdRoomForm:any;
roomType =['Single','double','Twin','Triple','Quad']
bathroomItems=["Toilet paper","Shower","Toilet","Hairdryer","BathTub","Bidet","Slippers","Bathrobe","Spa Tub"]
General_amenitiesItems=["Clothes rack","Flat-screen TV","Air conditioning","Linens","Desk","Wake-up service","Towels","Heating","Safe"]
OutdoorsViewsItems=["Balcony","Terrace","View"];
FoodDrinksItems=["Electric Kettle","Tea/Coffe maker","Dining area","Dining table","Microwave"]
selected_bathItems:string[]=[];
selected_GeneralItems:string[]=[];
selected_outdoorItems:string[]=[];
selected_foodDrinkItems:string[]=[];

constructor(
  private formBuilder:FormBuilder,
  private toastr:ToastrService,
  private roomService:RoomService,
  private router:Router
){

}
  ngOnInit(): void {
    this.firstRoomForm=this.formBuilder.group({
      roomType:this.formBuilder.control('',Validators.required),
      roomNumber:this.formBuilder.control('',Validators.required),
      twinBed:this.formBuilder.control(''),
      fullBed:this.formBuilder.control(''),
      queenBed:this.formBuilder.control(''),
      maxStay:this.formBuilder.control('',Validators.required),
      roomSize:this.formBuilder.control('',Validators.required),
      price:this.formBuilder.control('',Validators.required)
    })
    this.secondRoomForm=this.formBuilder.group({
      bathroomItems:this.formBuilder.control('',Validators.required),
      privateBath:this.formBuilder.control('',Validators.required)
    })
    this.thirdRoomForm=this.formBuilder.group({
      General_Items:this.formBuilder.control('',Validators.required),
      outdoor_Items:this.formBuilder.control('',Validators.required),
      foodDrink_Items:this.formBuilder.control('',Validators.required)
    })
  }
  select_bathItem(i:any){
    
    if(this.selected_bathItems.includes(i)){
      this.selected_bathItems.splice(this.selected_bathItems.indexOf(i),1)
      console.log(this.selected_bathItems)
    }else{
      this.selected_bathItems.push(i)
      console.log(this.selected_bathItems)
    }
  }
  select_General_Items(i:any){
    
    if(this.selected_GeneralItems.includes(i)){
      this.selected_GeneralItems.splice(this.selected_GeneralItems.indexOf(i),1)
      console.log(this.selected_GeneralItems)
    }else{
      this.selected_GeneralItems.push(i)
      console.log(this.selected_GeneralItems)
    }
  }
  select_outdoor_Items(i:any){
    
    if(this.selected_outdoorItems.includes(i)){
      this.selected_outdoorItems.splice(this.selected_outdoorItems.indexOf(i),1)
      console.log(this.selected_outdoorItems)
    }else{
      this.selected_outdoorItems.push(i)
      console.log(this.selected_outdoorItems)
    }
  }
  select_foodDrink_Items(i:any){
    
    if(this.selected_foodDrinkItems.includes(i)){
      this.selected_foodDrinkItems.splice(this.selected_foodDrinkItems.indexOf(i),1)
      console.log(this.selected_foodDrinkItems)
    }else{
      this.selected_foodDrinkItems.push(i)
      console.log(this.selected_foodDrinkItems)
    }
  }
  create(){
    if(this.thirdRoomForm.valid){
      let idNumber=localStorage.getItem('getHotelId');
      let _obj:room = {
        roomType: this.firstRoomForm.value.roomType,
        roomNumber: this.firstRoomForm.value.roomNumber,
        twin_bed: this.firstRoomForm.value.twinBed,
        full_bed: this.firstRoomForm.value.fullBed,
        queen_bed: this.firstRoomForm.value.queenBed,
        roomLimit: this.firstRoomForm.value.maxStay,
        roomSize: this.firstRoomForm.value.roomSize,
        price: this.firstRoomForm.value.price,
        private_bathroom: this.secondRoomForm.value.privateBath,
        items_bathroom: this.selected_bathItems,
        amenities_room: this.selected_GeneralItems,
        outdoors_room: this.selected_outdoorItems,
        food_room: this.selected_foodDrinkItems,
        hotel_id:Number(idNumber),
      }
      this.roomService.createRoom(_obj).subscribe(res=>{
        if(res){
          this.toastr.success("Room Created Successfully","Success")
          this.router.navigate(['/create-img']);
        }else[
          this.toastr.error("Failed to Create Room","Failed")
        ]
      })
    }
      
    else{
    this.toastr.error("InValid","please Fill the requirment")
    }}
}