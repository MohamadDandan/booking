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
 
}

export interface GeoPoint {
  type: 'point';
  data: { lng: number|undefined; lat: number |undefined};
}
