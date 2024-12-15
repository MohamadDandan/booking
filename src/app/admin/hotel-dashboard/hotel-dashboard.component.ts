import { Component, OnInit, ViewChild } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { MatTableDataSource } from '@angular/material/table';
import { hotel } from '../../dataType';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ImgService } from '../../service/img.service';
import { RoomService } from '../../service/room.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyDashboardComponent } from './dialog-body-dashboard/dialog-body-dashboard.component';

@Component({
  selector: 'app-hotel-dashboard',
  templateUrl: './hotel-dashboard.component.html',
  styleUrl: './hotel-dashboard.component.css'
})
export class HotelDashboardComponent implements OnInit {


  displayedColumns: string[] = ['id','name','country','state','city',"tools"];
  selectedData:hotel|undefined;
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort|undefined;
@ViewChild(MatPaginator)paginator: MatPaginator|undefined;
  constructor(
    private hotelService:HotelService,
  private router:Router,
  
  private matDialog:MatDialog,
  ){}
  ngOnInit(): void {
    this.getData();
  }




  getData() {
    this.hotelService.getHotel().subscribe((data:any) => {
      this.dataSource=new MatTableDataSource(data);
      this.selectedData==data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
    openDeleteDialog(element:any) {
      const dialogRef=this.matDialog.open(DialogBodyDashboardComponent,{
        width: '350px',
        data: {
          selected: element
        }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog delete closed',result);
        this.getData();
      });
      
      }
  
  onProcessHotelPage(ID: any,name:any) {
  
    localStorage.setItem('getHotelId', ID)
    localStorage.setItem('getHotelName', name)
    this.router.navigate(["onProcessHotel/"+ID]);
    }
}
