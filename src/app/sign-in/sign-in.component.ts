import { CookieService } from './../../../node_modules/ngx-cookie-service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { login, user } from '../dataType';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent implements OnInit {
  signInForm: any;
  loginForm: any;
  showLoginForm = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {
    this.authService.userAuthReload();
    this.signInForm = this.formBuilder.group({
      username: this.formBuilder.control('', Validators.required),
      email: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
    });
    this.loginForm = this.formBuilder.group({
      email: this.formBuilder.control('', Validators.required),
      password: this.formBuilder.control('', Validators.required),
    });
  }

  openLogin() {
    this.showLoginForm = true;
  }
  openReg() {
    this.showLoginForm = false;
  }
  signIn() {
    if (this.signInForm.valid) {
      let _obj: user = {
        name: this.signInForm.value.username as string,
        email_address: this.signInForm.value.email as string,
        password: this.signInForm.value.password as string,
        status: true,
        role: 'user',
      };
      console.log(_obj.email_address);
      this.authService
        .checkValidUser(_obj.email_address)
        .subscribe((result) => {
          console.warn(result);
          if (result != null) {
            console.warn('User already exists');
          } else {
            this.authService.signIn(_obj);
            let authToken=this.cookieService.get('authToken');
            this.authService.getDataFromAuthToken(authToken).subscribe(res=>{
              this.cookieService.set('userData', JSON.stringify(res));
            })
          }
        });
      //this.authService.signIn(_obj);
    } else {
      console.error('Form is invalid');
    }
  }

  logIn() {
    if (this.loginForm.valid) {
      let _obj: login = {
        email_address: this.loginForm.value.email as string,
        password: this.loginForm.value.password as string,
      };
      this.authService.login(_obj);
      /* let authToken=this.cookieService.get('authToken');
            this.authService.getDataFromAuthToken(authToken).subscribe(res=>{
              this.cookieService.set('userData', JSON.stringify(res));
            }) */
    } else {
      console.error('Form is invalid');
    }
  }
}
