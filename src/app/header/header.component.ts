import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';
import { user } from '../dataType';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  changeHeader = false;
  
  userData: user | undefined;
  menuType = false;
  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private router: Router
  ) {
    this.authService.isLoggedIn$.subscribe(status=>{
      this.changeHeader = status;
      
    })
  }

  ngOnInit(): void {
    
   this.getChangeHeaders();
  }
  getUserRole(){
    let userStore= localStorage.getItem("userData") ;
     this.userData = userStore && JSON.parse(userStore);
     if(this.userData?.role.match("admin"))
      return true;
    return false;
  }
   getChangeHeaders() {
    
    let authToken = this.cookieService.get("authToken");
    if(authToken.length) { 
      this.changeHeader=true;
    }
    else{
      console.log("dddw")
    this.changeHeader=false;}
  }

  logOut() {
    localStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigate(['']);
    this.changeHeader = false;
  }
}
