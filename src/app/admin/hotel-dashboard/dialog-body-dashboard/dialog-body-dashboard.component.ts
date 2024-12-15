import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserUpdateComponent } from '../../../user-update/user-update.component';
import { ImgService } from '../../../service/img.service';
import { RoomService } from '../../../service/room.service';
import { ToastrService } from 'ngx-toastr';
import { HotelService } from '../../../service/hotel.service';
import { HotelDashboardComponent } from '../hotel-dashboard.component';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-dialog-body-dashboard',
  templateUrl: './dialog-body-dashboard.component.html',
  styleUrl: './dialog-body-dashboard.component.css'
})
export class DialogBodyDashboardComponent {

  constructor(
    private dialogRef: MatDialogRef<HotelDashboardComponent>,
    private imgURLService: ImgService,
  private roomService: RoomService,
  private toastr:ToastrService,
  private hotelService:HotelService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }
cancel() {
  this.dialogRef.close();
}
delete() {
    const id = this.data.selected.id
    
      this.imgURLService.getImgByHotel(id).subscribe((data:any) => {
        console.log(data)
        data.forEach(element => {
          this.imgURLService.deleteImg(element.id).subscribe(data => {
          })
        });
      }
      , (err) => {
        if (err.status === 404) {
          console.log('Not found');
        }
        return EMPTY;
         }
    )
        this.roomService.getRoomsByHotel_Id(id).subscribe((data:any) => {
          data.forEach(element => {
            this.roomService.deleteRoom(element.id).subscribe(data => {
            })
          });
         
      },(err) => {
        if (err.status === 404) {
          console.log('Not found');
        }
        return EMPTY;
         });
       this.hotelService.deleteHotel(id).subscribe((data:any) => {
            this.toastr.success('Delete successful', 'Success!');
      this.dialogRef.close(true);
        })  
    
    }



}
