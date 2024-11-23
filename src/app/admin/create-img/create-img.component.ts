
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { imgURL, imgURL_updat, pic } from '../../dataType';
import { ImgService } from '../../service/img.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-img',
  templateUrl: './create-img.component.html',
  styleUrl: './create-img.component.css'
})
export class CreateImgComponent {
  thirdFromPhase: any;
  data: imgURL[] = [];
  array: any[] = [];
  imgData: imgURL_updat | undefined;
  dataSource: any;
  displayedColumns: string[] = ['pic_URL', 'pic_Name'];


  constructor(private formBuilder: FormBuilder,
    private imgURLService: ImgService,
    private toastr: ToastrService,
  private router:Router) {}
  ngOnInit(): void {
    this.thirdFromPhase = this.formBuilder.group({
      img_URL: this.formBuilder.control('', Validators.required),
    });
  }
  saveURL() {
    let name=localStorage.getItem('getHotelName');
    const url = this.thirdFromPhase.value.img_URL
    if (url.length > 0) {
      let _obj: pic = {
        pic_Name: (name +
          '_' +
          Math.floor(1 + Math.random() * 900)) as string,
        pic_URL: this.thirdFromPhase.value.img_URL as string,
      };
      this.imgURLService.create_IMG(_obj).subscribe((data) => {
        this.toastr.success('Create', 'Success');
        this.dataSource = this.data;
        this.dataSource.push(data as imgURL);
        this.dataSource = [...this.data];
        this.thirdFromPhase.get('img_URL').setValue('');
      });
    }else{
      this.toastr.error('Error',"invalid url")
    }
  }
  retunMenu(){
    this.router.navigate(['/onProcessHotel']);
  }
}
