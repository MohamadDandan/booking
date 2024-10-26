import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../environments/environment.development';
import { login, user } from '../dataType';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  invalidUserAuth=new EventEmitter<boolean>(false);
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  private basicURL=environment.basicURL;
  authToken: any;
 
  constructor(private http:HttpClient,
    private router:Router,
    private cookieService:CookieService
  ) { }

 
  checkValidUser(user_email:string){
    return this.http.get(this.basicURL+"/check/"+user_email)
    
  }
  signIn(user:user){
    
    return this.http.post(`${this.basicURL}/auth/signup`, user).subscribe((res:any)=>{
      this.authToken=res.authToken;
      this.cookieService.set('authToken', this.authToken);
      this.invalidUserAuth.emit(false);
      this.router.navigate(['']);
    });
}
  login(user:login){
    return this.http.post(`${this.basicURL}/auth/login`, user).subscribe((res:any)=>{
      this.authToken=res.authToken;
      this.getDataFromAuthToken(this.authToken).subscribe((res:any)=>{
        this.cookieService.set('authToken', this.authToken);
        localStorage.setItem("userData", JSON.stringify(res.user))
        
        this.loggedIn.next(true);
      })
       console.warn(res)

       /* this.cookieService.set('authToken', this.authToken); */
       
       this.invalidUserAuth.emit(false);
       
      this.router.navigate(['']);
      
      
    });
  }
//not used
  userAuthReload(){
    if(this.cookieService.check('authToken')){
      this.router.navigate(['/']);
    }
  }
  getDataFromAuthToken(authToken:string){
    return this.http.get(`${this.basicURL}/auth/me`,{
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
  }
}
