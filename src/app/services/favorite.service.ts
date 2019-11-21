import { Injectable, asNativeElements } from '@angular/core';
import { WeatherData } from '../weather-data/weather-data';
import { generate, Subject } from 'rxjs';
import { WeatherdataService } from './weatherdata.service';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { Favorite } from '../favorites/favorite';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private weatherdataService: WeatherdataService) { }

  public curFav: Favorite;
  // public curKey: string;
  private isFavoriteUpdated = new Subject<boolean>();
  private isFavorite;
  private favArr = [];
  private favArrayUpdated = new Subject<any>();

  prepFavData() {
    console.log(this.isFavorite);
    const weatherParam = this.weatherdataService.getWeatherParams();
    console.log(weatherParam);
    let fav = null;

    if (weatherParam) {
      const curKey = this.generateKey(weatherParam.city, weatherParam.state);
      this. curFav = {
        city: weatherParam.city,
        state: weatherParam.state,
        lat: weatherParam.lat,
        lon: weatherParam.lon,
        key: curKey
      };
      console.log(this.curFav);
      // console.log(this.curFav);
      // console.log(this.curKey);
      // console.log(typeof this.getFavorite(this.curKey));
      // console.log(true);
      fav = this.getFavorite(this.curFav.key);
    }
    // localStorage.setItem('Alay', '1');
    // console.log(fav === null);
    // console.log(localStorage);
    if (fav !== null) {
      this.isFavorite = true;
    } else {
      this.isFavorite = false;
    }
    // console.log(this.isFavorite);
    // console.log('Printing key: ' + this.curFav.key);
    this.isFavoriteUpdated.next(this.isFavorite);
  }

  getFavoriteListener() {
    return this.isFavoriteUpdated.asObservable();
  }

  getfavArrayListener() {
    return this.favArrayUpdated.asObservable();
  }

  generateKey(city: string, state: string) {
    const key = city.replace(/\s/g, '').toLowerCase() + '-' + state.replace(/\s/g, '').toLowerCase();
    return key;
  }

  setFavorite() {
    if (this.curFav.key) {
      localStorage.setItem(this.curFav.key, JSON.stringify(this.curFav));
      this.isFavorite = true;
      this.isFavoriteUpdated.next(this.isFavorite);
      this.favArr.push(this.curFav);
      this.favArrayUpdated.next(this.favArr);
    }
  }

  removeFavorite(key) {
    if (key === this.curFav.key) {
      this.isFavorite = false;
      this.isFavoriteUpdated.next(this.isFavorite);
    }
    localStorage.removeItem(key);
    this.genFavArray();
  }

  getFavorite(key: string): string {
    const res = localStorage.getItem(key);
    // console.log(res);
    return res;
  }

  genFavArray() {
    let i;
    this.favArr = [];
    for (i = 0; i < localStorage.length; i++) {
      const fav = JSON.parse(localStorage.getItem(localStorage.key(i)));
      this.favArr.push(fav);
    }
    this.favArrayUpdated.next(this.favArr);
  }

  loadFavData() {
    this.favArrayUpdated.next(this.favArr);
  }

}
