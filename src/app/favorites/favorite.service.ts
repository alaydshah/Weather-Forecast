import { Injectable } from '@angular/core';
import { WeatherdataService } from '../weather-data/weatherdata.service';
import { WeatherData } from '../weather-data/weather-data';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private weatherdataService: WeatherdataService) { }

  private curFav: WeatherData;
  private curKey: string;

  prepFavData(weatherParam: WeatherData) {
    this.curFav = weatherParam;
  }

  generateKey() {
    this.curKey = this.curFav.city.toLowerCase() + '-' + this.curFav.state.toLowerCase();
  }

  setFavorite() {
    localStorage.setItem(this.curKey, JSON.stringify(this.curFav));
  }

}
