import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { WeatherData } from '../weather-data/weather-data';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WeatherdataService {

  constructor(private http: HttpClient) { }

  serverUrl = 'http://localhost:5000/';
  private weatherData;
  private weatherDataUpdated = new Subject<any>();
  private weatherParam: WeatherData;

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
        console.log(response);
        this.updateWeatherParams(inCity, inState, this.weatherData.latitude, this.weatherData.latitude);
        this.weatherDataUpdated.next(this.weatherData);
      });
  }

  getWeatherData() {
    console.log('WeatherData Services getWeatherData called');
    console.log(this.weatherData);
    this.weatherDataUpdated.next(this.weatherData);
  }

  onClear() {
    console.log('WeatherData Clear fired');
    this.weatherData = null;
    this.weatherDataUpdated.next();
  }

  getParameterData(parameter) {
    if (this.weatherData) {
      return this.weatherData[parameter];
    }
    return;
  }

  updateWeatherParams(inCity, inState, lat, lon) {
    this.weatherParam = {
      city: inCity,
      state: inState,
      lat: this.weatherData.latitude,
      lon: this.weatherData.latitude
    };
  }

  getWeatherParams() {
    return this.weatherParam;
  }
}