import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';
import { userUpdate } from '../dataType';
import { MatTableDataSource } from '@angular/material/table';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrl: './user-update.component.css'
})
export class UserUpdateComponent implements OnInit {

//, 'name','email', 'password'
  
  displayedColumns: string[] = ['id','name','email_address','status','role',"tools"];
dataSource: any;
  

  constructor(
    private userService:UserService,
    private matDialog:MatDialog){}

    openDialog() {
      this.matDialog.open(DialogBodyComponent,{
        width: '350px'
      });
      }
  ngOnInit(): void {
    this.userService.getUsersCustomes().subscribe((data:any) => {
      this.dataSource=new MatTableDataSource(data);
      console.log(this.dataSource)
      
      /* this.dataSource = new MatTableDataSource(data); */
      
    })
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




}
