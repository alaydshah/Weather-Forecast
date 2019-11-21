import { Injectable } from '@angular/core';
import { WeatherdataService } from './weatherdata.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { SearchForm } from './search-form';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  constructor(private weatherdataService: WeatherdataService,
              private http: HttpClient) { }

  checkService() {
    console.log(this.weatherdataService.check());
  }

  searchQuery(form) {

    const street = form.street;
    let city = form.city;
    let state = form.state;
    const currLoc = form.currLoc;
    let lat = 0;
    let lon = 0;

    if (form.currLoc) {
      // console.log(form.currLocJson.region);
      lat = form.currLocJson.lat;
      lon = form.currLocJson.lon;
      city = form.currLocJson.city;
      state = form.currLocJson.region;
    }
    console.log(city);
    console.log(state);
    console.log(currLoc);
    this.weatherdataService.fetchWeatherData(street, city, state, currLoc, lat, lon);

    // console.log(city);
    // console.log(state);
  }

  // getGeoData() {
  //   const currLocUrl = 'http://ip-api.com/json';
  //   return this.http.get(currLocUrl);
  // }
}
