import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../service/user.service';
import { userUpdate } from '../dataType';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {
date(arg0: any) {
let timeForm =new Date(arg0);
return timeForm.toLocaleString();
}

//, 'name','email', 'password'
  
  displayedColumns: string[] = ['id','updated_at','name','email_address','status','role',"tools"];
dataSource: any;
selectedData:userUpdate|undefined;
@ViewChild(MatSort) sort: MatSort|undefined;
@ViewChild(MatPaginator)paginator: MatPaginator|undefined;

  constructor(
    private userService:UserService,
    private matDialog:MatDialog,
  private toastr:ToastrService){}

    
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.userService.getUsersCustomes().subscribe((data:any) => {
      this.dataSource=new MatTableDataSource(data);
      this.selectedData==data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  
    })
  }
  openEditDialog(element:any) {
    console.log("ee" +element.status);
    const dialogRef=this.matDialog.open(DialogBodyComponent,{
      width: '55%',
      data: {
        changeDialog: false,
        selected: element
      }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed',result);
      this.getData();
    });
    
    }
    openDeleteDialog(element:any) {
      console.log("ee" +element.status);
      const dialogRef=this.matDialog.open(DialogBodyComponent,{
        width: '350px',
        data: {
          changeDialog: true,
          selected: element
        }
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog delete closed',result);
        this.getData();
      });
      
      }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
