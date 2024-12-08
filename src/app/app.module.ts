import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { angu_MaterialModule } from './material';
import { HeaderComponent } from './header/header.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { GoogleMapsModule } from "@angular/google-maps";
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { DialogBodyComponent } from './user-update/dialog-body/dialog-body.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProfileComponent } from './profile/profile.component';
import { CreateHotelComponent } from './admin/create-hotel/create-hotel.component';
import { UpdateHotelComponent } from './admin/update-hotel/update-hotel.component';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { CreateRoomComponent } from './admin/create-room/create-room.component';
import { CreateImgComponent } from './admin/create-img/create-img.component';
import { OnProcessMenuComponent } from './admin/on-process-menu/on-process-menu.component';
import { EditImgComponent } from './admin/edit-img/edit-img.component';
import { HotelDashboardComponent } from './admin/hotel-dashboard/hotel-dashboard.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignInComponent,
    ProfileComponent,
    ErrorPageComponent,
    UserUpdateComponent,
    DialogBodyComponent,
    CreateHotelComponent,
    UpdateHotelComponent,
    CreateRoomComponent,
    CreateImgComponent,
    OnProcessMenuComponent,
    EditImgComponent,
    HotelDashboardComponent
        
  ],
  imports: [
    MatSelectCountryModule.forRoot('en'),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    GoogleMapsModule ,
    HttpClientModule,
    angu_MaterialModule,
   
  ],
  providers: [
    {provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true }},
    provideAnimationsAsync(),
    CookieService
  ],
  bootstrap: [AppComponent],
 
})
export class AppModule { }
