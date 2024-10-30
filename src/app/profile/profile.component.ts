import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { userUpdate } from '../dataType';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  userData: userUpdate | undefined;

  updateForm: any;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {}
  ngOnInit(): void {
    this.Data();
  }
  Data() {
    let userStore = localStorage.getItem('userData');

    this.userData = userStore && JSON.parse(userStore);

    this.updateForm = this.formBuilder.group({
      username: [{ value: this.userData?.name, disabled: false }],
      email: [{ value: this.userData?.email_address, disabled: false }],
      password: [{ value: this.userData?.password, disabled: false }],
      
    });
  }
  update() {
    if (this.updateForm.value) {
      let _obj: userUpdate = {
        id: this.userData?.id as number,
        name: this.updateForm.value.username as string,
        email_address: this.updateForm.value.email as string,
        password: this.updateForm.value.password as string,
       
      };
      console.log(_obj);
      this.userService.updateUser(_obj).subscribe(
        (res: any) => {
          localStorage.setItem('userData', JSON.stringify(res));
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
