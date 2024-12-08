import { Component, OnInit, ViewChild } from '@angular/core';
import { HotelService } from '../../service/hotel.service';
import { MatTableDataSource } from '@angular/material/table';
import { hotel } from '../../dataType';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  private router:Router,private toastr:ToastrService){}
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
  delete(id: any) {
    this.hotelService.deleteHotel(id).subscribe((data:any) => {
      this.toastr.success('Delete successful', 'Success!');
      this.getData();
    })
    }
  onProcessHotelPage(ID: any,name:any) {
  
    localStorage.setItem('getHotelId', ID)
    localStorage.setItem('getHotelName', name)
    this.router.navigate(["onProcessHotel/"+ID]);
    }
}
