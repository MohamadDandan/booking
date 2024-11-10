import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  basicURL=environment.basicURL;
  private apiUrl = 'https://api.countrystatecity.in/v1/countries';
  private headers = new HttpHeaders({
    'X-CSCAPI-KEY': 'aEZsT29YeFR2b0ZHY05Xak54M1Q2ZU9uRWQ4ZjRaNlp1dkJ5NDdRSg=='
  });
  constructor(private http:HttpClient) { }

  getCountries(): Observable<any> {
    return this.http.get(this.apiUrl, { headers: this.headers });
  }
  getState(stateCode:string): Observable<any> {
    return this.http.get(this.apiUrl+"/"+stateCode+"/states", { headers: this.headers });
  }
  getCities(stateCode:string,cityCode:string): Observable<any>{
    return this.http.get(this.apiUrl+"/"+stateCode+"/states/"+cityCode+"/cities", { headers: this.headers });
  }
  getFacilities(){
    return this.http.get(this.basicURL+'/hotelservices');
  }
}
