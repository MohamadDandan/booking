export interface user {
  name: string;
  email_address: string;
  password: string;
  status: boolean;
  role: string;
}
export interface login {
  email_address: string;
  password: string;
}
export interface userUpdate {
  id: number;
  name: string;
  email_address: string;
  password: string;
}
export interface adminUpdate {
  id: number;
  status: boolean;
  role: string;
  updated_at: number;
}
export interface facilities {
  id: number;
  nameIcon: string;
  name: string;
}
export interface imgURL {
  id: number;
  pic_Name: string;
  pic_URL: string;
}
export interface imgURL_updat {
  id: number;
  pic_Name: string;
  pic_URL: string;
  hotel_id: number;
}
export interface pic {
  pic_Name: string;
  pic_URL: string;
}

export interface hotel {
  id: number;
  name: string;
  address: string;
  Description: string;
  country: string;
  state: string;
  city: string;
  location: GeoPoint;
  hotelservices_id: number[];
  Check_in_From:string;
  Check_in_Until:string;
  Check_out_From:string;
  Check_out_Until:string;
}

export interface GeoPoint {
  type: 'point';
  data: { lng: number|undefined; lat: number |undefined};
}
export interface room{
  roomType: string;
  roomNumber: number;
  twin_bed: number;
  full_bed: number;
  queen_bed: number;
  roomLimit: number;
  roomSize: number;
  price:number;
  private_bathroom:boolean;
  items_bathroom:string[];
  amenities_room:string[];
  outdoors_room:string[];
  food_room:string[];
  hotel_id:number;
}
