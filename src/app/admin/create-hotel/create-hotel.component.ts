import { pic, hotel, imgURL_updat } from './../../dataType';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Map, MapStyle, config, Marker } from '@maptiler/sdk';
import { Country } from '@angular-material-extensions/select-country';
import { facilities, imgURL } from '../../dataType';
import { FacilityService } from '../../service/facility.service';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { MatTableDataSource } from '@angular/material/table';
import { ImgService } from '../../service/img.service';
import { HotelService } from '../../service/hotel.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrl: './create-hotel.component.css',
})
export class CreateHotelComponent {
  firstFromPhase: any;
  secondFromPhase: any;
  thirdFromPhase: any;
  state = true;
  city = true;
  lng: any;
  lat: any;
  map: Map | undefined;
  mark: Marker | undefined;
  timeSelected=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00",
    "12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
  cityData: any;
  stateData: any;
  stateCode: string | undefined;
  allFacilities: facilities[] | undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;

 
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private facilityService: FacilityService,
    private hotelService: HotelService,
    private router: Router
  ) {}

  ngOnInit(): void {
    
    config.apiKey = 'OKexzFIiJHMEkDAjDqFz';
    this.getFacilities();

    this.firstFromPhase = this.formBuilder.group({
      hotelName: this.formBuilder.control('', Validators.required),
      hotelAddress: this.formBuilder.control('', Validators.required),
      hotelServices: this.formBuilder.control('', Validators.required),
      description: this.formBuilder.control('', Validators.required),
    });
    this.secondFromPhase = this.formBuilder.group({
      country: this.formBuilder.control('', Validators.required),
      state: this.formBuilder.control('', Validators.required),
      city: this.formBuilder.control('', Validators.required),
    });
    this.thirdFromPhase = this.formBuilder.group({
      time_in_from: this.formBuilder.control('', Validators.required),
      time_in_until: this.formBuilder.control('', Validators.required),
      time_out_from: this.formBuilder.control('', Validators.required),
      time_out_until: this.formBuilder.control('', Validators.required)
    });
   
  }
  getFacilities() {
    this.facilityService.getFacilities().subscribe((data) => {
      this.allFacilities = data as facilities[];
    });
  }
  create() {
    let lnglat = this.mark?.getLngLat();
    if(this.thirdFromPhase.value.time_in_from<this.thirdFromPhase.value.time_in_until){
    if(this.thirdFromPhase.value.time_out_from<this.thirdFromPhase.value.time_out_until){
      
    if (this.firstFromPhase.value) {
      let _hotelObj: hotel = {
        id: 0,
        name: this.firstFromPhase.value.hotelName as string,
        address: this.firstFromPhase.value.hotelAddress as string,
        Description: this.firstFromPhase.value.description as string,
        country: this.secondFromPhase.value.country.name as string,
        state: this.secondFromPhase.value.state as string,
        city: this.secondFromPhase.value.city as string,
        location: {
          type: 'point',
          data: {
            lng: lnglat?.lat,
            lat: lnglat?.lng,
          },
        },
        hotelservices_id: this.firstFromPhase.value.hotelServices as number[],
        Check_in_From:this.thirdFromPhase.value.time_in_from as string,
        Check_in_Until:this.thirdFromPhase.value.time_in_until as string,
        Check_out_From:this.thirdFromPhase.value.time_out_from as string,
        Check_out_Until:this.thirdFromPhase.value.time_out_until as string,
      };

      this.hotelService.createHotel(_hotelObj).subscribe((data) => {
        localStorage.setItem('getHotelId', JSON.stringify(data.id));
        localStorage.setItem('getHotelName', JSON.stringify(data.name));
        this.router.navigate(['/create-room']);

        this.toastr.success('Create', 'Success');
      });
    } else {
      this.toastr.error('Create', 'Error');
    }
  }else{
    this.toastr.error('time', 'Error');
  }
}else{
  this.toastr.error('time1', 'Error');
}
  }

  ngAfterViewInit() {
    this.getMapData('Country');
  }
  ngOnDestroy() {
    this.map?.remove();
  }
  onCountrySelected(country: Country) {
    if (country) if (country.name) this.getMapData(country.name);
    this.facilityService.getState(country.alpha2Code).subscribe((data) => {
      this.stateData = data;
      this.stateCode = country.alpha2Code;
      this.state = false;
    });
    //alpha2Code
  }
  see(s: any) {
    console.warn(s);
    if (this.stateCode) {
      this.city = false;
      this.facilityService
        .getCities(this.stateCode, s.iso2)
        .subscribe((data) => {
          this.cityData = data;
        });
    } else console.error('Could not error');
  }

  async getMapData(countryName: string) {
    if (countryName == 'Country') {
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: MapStyle.STREETS,
        geolocate: 'COUNTRY',
      });
    } else {
      const maptilerClient = await import('@maptiler/client');
      const result = await maptilerClient.geocoding.forward(countryName);
      const { features } = result;
      if (features.length > 0) {
        const geometry = features[0].geometry as GeoJSON.Point;
        this.lng = geometry.coordinates[0];
        this.lat = geometry.coordinates[1];
        console.log(`Longitude: ${this.lng}, Latitude: ${this.lat}`);
        this.map = new Map({
          container: this.mapContainer.nativeElement,
          style: MapStyle.STREETS,
          center: [this.lng, this.lat],
          zoom: 11,
        });
        this.mark = new Marker({
          color: '#00ffff',
          draggable: true,
          anchor: 'center',
        })
          .setLngLat([this.lng, this.lat])
          .addTo(this.map);
        console.log(this.map._locale);
      } else {
        console.error('No results found');
      }
    }
  }

  
}
