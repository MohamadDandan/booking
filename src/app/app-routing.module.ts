import { SignInComponent } from './sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard_Admin, authGuard_Guest, authGuard_User } from './auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserUpdateComponent } from './user-update/user-update.component';


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
}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
