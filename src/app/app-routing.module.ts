import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard_Admin, authGuard_Guest, authGuard_User, onProcess_hotel } from './auth.guard';

import { ErrorPageComponent } from './error-page/error-page.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { ProfileComponent } from './profile/profile.component';
import { CreateHotelComponent } from './admin/create-hotel/create-hotel.component';
import { CreateRoomComponent } from './admin/create-room/create-room.component';
import { CreateImgComponent } from './admin/create-img/create-img.component';
import { OnProcessMenuComponent } from './admin/on-process-menu/on-process-menu.component';


const routes: Routes = [

 { 
  path:"signIn", 
  component:SignInComponent,
  canActivate:[authGuard_User]
},
{
  path:"profile",
  component:ProfileComponent,
  canActivate:[authGuard_Guest]
},
{
  path:"404",
  component:ErrorPageComponent
},
{
  path:"user-update",
  component: UserUpdateComponent,
  canActivate:[authGuard_Admin]
},
{
  path:"create-hotel",
  component:CreateHotelComponent,
},
{
  path:"create-room",
  component:CreateRoomComponent,
},
{
  path:"create-img",
  component: CreateImgComponent,
},
{
  path:"onProcessHotel",
  component: OnProcessMenuComponent,
  canActivate:[onProcess_hotel]
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
