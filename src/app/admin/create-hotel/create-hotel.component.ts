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
@Component({
  selector: 'app-create-hotel',
  templateUrl: './create-hotel.component.html',
  styleUrl: './create-hotel.component.css',
})
export class CreateHotelComponent {
  firstFromPhase: any;
  secondFromPhase: any;
  thirdFromPhase: any;
  state=true;
  city=true;
  lng: any;
  lat: any;
  map: Map | undefined;
  mark: Marker | undefined;
  data:imgURL[]=[];
  imgData:imgURL_updat|undefined;
  cityData:any
  stateData:any;
  stateCode:string|undefined;
  allFacilities: facilities[]|undefined;

  @ViewChild('map')
  private mapContainer!: ElementRef<HTMLElement>;
dataSource: any;
displayedColumns: string[] = ['id','pic_URL','pic_Name'];

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private facilityService: FacilityService,
    private imgURLService:ImgService,
    private hotelService:HotelService
  ) {}

  ngOnInit(): void {
   // this.getData();
    this.facilityService.getCountries().subscribe(
      result => console.log(result),
      error => console.log('error', error)
    );
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
      city: this.formBuilder.control('', Validators.required)
    });
    this.thirdFromPhase = this.formBuilder.group({
      img_URL: this.formBuilder.control('', Validators.required),
    })
  }
  getFacilities(){
    this.facilityService.getFacilities().subscribe(data => {
      this.allFacilities = data as facilities[];
      
    });
  }  
  create() {
    let lnglat = this.mark?.getLngLat();
    console.log(lnglat);
    let loc;
    if (this.firstFromPhase.valid) {
      let _hotelObj:hotel={
        id:0 ,
        name: this.firstFromPhase.value.hotelName as string,
        address: this.firstFromPhase.value.hotelAddress as string,
        Description: this.firstFromPhase.value.description as string,
        country: this.secondFromPhase.value.country.name as string,
        state: this.secondFromPhase.value.state as string,
        city: this.secondFromPhase.value.city as string,
        location :{
          type: 'point',
          data:{
            lng:lnglat?.lat,
            lat:lnglat?.lng
          }
        },
        hotelservices_id: this.firstFromPhase.value.hotelServices as number[],
        
       }
       console.log(_hotelObj);
       this.hotelService.createHotel(_hotelObj).subscribe(data => {
        
        
        this.data.map(d=>{
          let _obj:imgURL_updat={
            id:d.id,
            pic_Name:d.pic_Name as string,
            pic_URL:d.pic_URL as string,
            hotel_id:data.id as number
          }
          this.imgURLService.updateImg(_obj).subscribe(data=>{
            console.log(data)
          })
        })
        console.log(data);
        this.toastr.success('Create', 'Success');
      });
      
    } else {
      console.log(this.firstFromPhase.value)
      console.log(this.secondFromPhase.value)
      this.toastr.error('Create', 'Error');
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
    this.facilityService.getState(country.alpha2Code).subscribe(data => {
      this.stateData = data;
      this.stateCode=country.alpha2Code;
      this.state=false;
    })
//alpha2Code 
}
see(s:any){
console.warn(s);
if(this.stateCode){
  this.city=false;
  this.facilityService.getCities(this.stateCode,s.iso2).subscribe(data=>{
  this.cityData=data;
})}
else
  console.error("Could not error")
}
    
 
  async getMapData(countryName: string) {
    if(countryName =="Country"){
      this.map = new Map({
        container: this.mapContainer.nativeElement,
        style: MapStyle.STREETS,
        geolocate:"COUNTRY"
      });
    }else{
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
  
  saveURL(){
    if(this.thirdFromPhase.value){
      let _obj:pic={
        pic_Name:this.firstFromPhase.value.hotelName +"_"+Math.floor(1 + Math.random() * 900) as string,
        pic_URL:this.thirdFromPhase.value.img_URL as string
      }
      this.imgURLService.create_IMG(_obj).subscribe(data=>{
        this.toastr.success('Create', 'Success');
        const array=this.data;
      array.push(data as imgURL);
      this.dataSource=[...array]
        this.thirdFromPhase.get('img_URL').setValue("");
        
      })
      
     /*  let val=Math.random()
      let dataString={id:val,pic_URL:this.thirdFromPhase.value.img_URL,pic_Name:this.firstFromPhase.value.hotelName}
      const array=this.data;
      array.push(dataString);
      this.dataSource=[...array]
      
      console.log(this.thirdFromPhase.value,this.firstFromPhase.value.hotelName);
      this.thirdFromPhase.get('img_URL').setValue(""); */
    }
    

  }
  getData() {
    this.imgURLService.getImg().subscribe((data:any) => {
      this.dataSource=new MatTableDataSource(data);
     
  
    })
  }
}

//for autocomplete
// allFacilities: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

/*
filteredFruits = computed(() => {
  const currentFruit = this.currentFruit().toLowerCase();
  return currentFruit
    ? this.allFruits.filter(fruit => fruit.toLowerCase().includes(currentFruit))
    : this.allFruits.slice();
});
*/
