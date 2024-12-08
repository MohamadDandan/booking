import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { imgURL } from '../../dataType';
import { ImgService } from '../../service/img.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-edit-img',
  templateUrl: './edit-img.component.html',
  styleUrl: './edit-img.component.css'
})
export class EditImgComponent {

  data: imgURL[] = [];
  dataSource: any;
  displayedColumns: string[] = ['pic_URL', 'pic_Name',"tools"];


  constructor(private formBuilder: FormBuilder,
    private imgURLService: ImgService,
    private toastr: ToastrService,
  private router:Router) {}
  id=localStorage.getItem('getHotelId');
  ngOnInit(): void {
    this.getData()
  }

getData(){
  if(this.id)
    this.imgURLService.getImgByHotel(this.id).subscribe(data => {
      this.dataSource=new MatTableDataSource(data);
    })
}



  Deleter(img: any) {
    if(img.id){
      this.imgURLService.deleteImg(img.id).subscribe((data) => {
        this.getData();
        this.toastr.info("Img deleted successfully","Delete")
      });
    }else{
      this.toastr.error('Error',"No id found")
    }
    }
  retunMenu(){
    this.router.navigate(['/onProcessHotel']);
  }
}
