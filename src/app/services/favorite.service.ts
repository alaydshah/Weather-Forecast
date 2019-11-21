import { Injectable, asNativeElements } from '@angular/core';
import { WeatherData } from '../weather-data/weather-data';
import { generate, Subject } from 'rxjs';
import { WeatherdataService } from './weatherdata.service';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private weatherdataService: WeatherdataService) { }

  private curFav: WeatherData;
  private curKey: string;
  private isFavoriteUpdate = new Subject<boolean>();
  private isFavorite;

  prepFavData() {
    console.log(this.isFavorite);
    const weatherParam = this.weatherdataService.getWeatherParams();
    console.log(weatherParam);
    if (weatherParam) {
      this.curFav = weatherParam;
      this.curKey = this.generateKey(this.curFav.city, this.curFav.state);
      // console.log(this.curFav);
      console.log(this.curKey);
      console.log(typeof this.getFavorite(this.curKey));
      // console.log(true);
    }
    // localStorage.setItem('Alay', '1');
    const fav = this.getFavorite(this.curKey);
    console.log(fav === null);
    // console.log(localStorage);
    if (fav !== null) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
    console.log(this.isFavorite);
    console.log('Printing key: ' + this.curKey);
    this.isFavoriteUpdate.next(this.isFavorite);
  }

  getFavoriteListener() {
    return this.isFavoriteUpdate.asObservable();
  }

  generateKey(city: string, state: string) {
    const key = city.replace(/\s/g, '').toLowerCase() + '-' + state.replace(/\s/g, '').toLowerCase();
    return key;
  }

  setFavorite() {
    if (this.curKey) {
      localStorage.setItem(this.curKey, JSON.stringify(this.curFav));
      this.isFavorite = true;
      this.isFavoriteUpdate.next(this.isFavorite);
    }
  }

  removeFavorite() {
    localStorage.removeItem(this.curKey);
    this.isFavorite = false;
    this.isFavoriteUpdate.next(this.isFavorite);
  }

  getFavorite(key: string): string {
    const res = localStorage.getItem(key);
    // console.log(res);
    return res;
  }
}