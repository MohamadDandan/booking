import { FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { adminUpdate, userUpdate } from '../../dataType';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../service/user.service';
import { UserUpdateComponent } from '../user-update.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog-body',
  templateUrl: './dialog-body.component.html',
  styleUrl: './dialog-body.component.css',
})
export class DialogBodyComponent implements OnInit {
  statusValue: any;
  roleValue: any;
  updateForm: any;
  changeDialog=false;
  userData: adminUpdate | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {
    if(this.data.changeDialog) {
      this.changeDialog = true;
    }else{
      this.changeDialog = false;
      let userStore = localStorage.getItem('userData');
    this.userData = userStore && JSON.parse(userStore);
    this.statusValue = this.data.selected.status;
    this.roleValue = this.data.selected.role;
    this.updateForm = this.formBuilder.group({
      status: [{ value: this.userData?.status }],
      role: [{ value: this.userData?.role }],
    });
    }
    
  }

  update() {
    if (this.updateForm.value) {
      let _obj: adminUpdate = {
        id: this.data.selected.id as number,
        status: this.updateForm.value.status as boolean,
        role: this.updateForm.value.role as string,
        updated_at:Date.now() as number,
        
      };
      this.userService.updateByAdmin(_obj).subscribe((data) => {
      this.toastr.success('Update successful', 'Success!');
        console.log(data);
        this.dialogRef.close(this.updateForm.value);
      });
    }
  }
  delete(){
    this.userService.delete(this.data.selected.id).subscribe((data) => {
      this.toastr.success('Delete successful', 'Success!');
      this.dialogRef.close(true);
    });
  }
  cancel() {
    this.dialogRef.close();
  }
}
