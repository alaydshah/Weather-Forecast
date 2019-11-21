import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from './weather-data';
import { FavoriteService } from '../favorites/favorite.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:5000/';
  // private paramData = [];
  private weatherData;
  private weatherDataUpdated = new Subject<any>();
  private weatherParam;

  check() {
    console.log('WeatherdataService check');
  }

  getWeatherdataListener() {
    console.log('getWeatherdataListener');
    console.log(this.weatherData);
    return this.weatherDataUpdated.asObservable();
  }

  fetchWeatherData(inStreet, inCity, inState, inCurrLoc, inLat, inLon) {
    this.weatherDataUpdated.next();
    console.log('getWeatherData');
    const params = new HttpParams({
      fromObject: {
        street: inStreet,
        city: inCity,
        state: inState,
        currLoc: inCurrLoc,
        lat: inLat,
        lon: inLon
      }
    });
    const endPoint = this.serverUrl + 'search';
    this.http.get(endPoint, {params}).subscribe(
      (response) => {
        this.weatherData = response;
        this.weatherDataUpdated.next(this.weatherData);
        console.log(response);
        this.updateWeatherParams(inCity, inState, this.weatherData.latitude, this.weatherData.latitude);
        // this.favoriteService.prepFavData(this.weatherParam);
        // this.weatherParam.city = inCity;
        // console.log(inState);
        // this.weatherParam.state = inState;
        // this.weatherParam.lat = this.weatherData.latitude;
        // this.weatherParam.lon = this.weatherData.longitude;
      });
  }

  getWeatherData() {
    console.log('WeatherData Services getWeatherData called');
    console.log(this.weatherData);
    this.weatherDataUpdated.next(this.weatherData);
    // return this.weatherDataUpdated.asObservable();
  }

  onClear() {
    console.log('WeatherData Clear fired');
    this.weatherData = null;
    this.weatherDataUpdated.next();
  }

  getParameterData(parameter) {
    if (this.weatherData) {
      // this.paramData = [];
      // let i = 0;
      // for (i = 0; i < 24; i++) {
      //   this.paramData.push(this.weatherData.hourly.data[i][parameter]);
      // }
      return this.weatherData[parameter];
    }
    return;

  }

  updateWeatherParams(inCity, inState, lat, lon) {
    this.weatherParam = {
      city: inCity,
      state: inState,
      lat: this.weatherData.latitude,
      longitude: this.weatherData.latitude
    };

  }

  // getParameterData(parameter) {
  //   if (this.weatherData) {
  //     this.paramData = [];
  //     let i = 0;
  //     for (i = 0; i < 24; i++) {
  //       this.paramData.push(this.weatherData.hourly.data[i][parameter]);
  //     }

  //   }
  //   return this.paramData;
  // }

}
