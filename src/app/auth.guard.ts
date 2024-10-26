import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard_User: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService);

  if (cookieService.get('authToken')) return false;

  return true;
};
export const authGuard_Admin: CanActivateFn = (route, state) => {
  let userStore = localStorage.getItem('userData');
  let userData = userStore && JSON.parse(userStore);

  if (userData.role == 'admin') return true;

  return false;
};
export const authGuard_Guest: CanActivateFn = (route, state) => {
  let cookieService = inject(CookieService);
  let router = inject(Router);

  if (cookieService.get('authToken'))
    //can activate
    return true; //ture
  //cant activate
  else {
    router.navigate(['/404']);
    return false;
  }
};
