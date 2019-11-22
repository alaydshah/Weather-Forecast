import { Component, OnInit, Input } from '@angular/core';
import { Subscription, Observable, Subject } from 'rxjs';
import { WeatherdataService } from '../services/weatherdata.service';
import { FavoriteService } from '../services/favorite.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  // @Input() weatherData;

  constructor(private weatherdataService: WeatherdataService,
              private favoritesService: FavoriteService) {

   }

   private weatherData;
   private weatherdataSub: Subscription;
   private isFavourite;
   private favSubscription: Subscription;

  ngOnInit() {
    this.weatherdataSub = this.weatherdataService.getWeatherdataListener().subscribe((data) => {
      this.weatherData = data;
      console.log(this.weatherData);
      this.favoritesService.prepFavData();
    });

    this.favSubscription = this.favoritesService.getFavoriteListener()
    .subscribe((data) => {
      this.isFavourite = data;
    });
    // TODO: Cosider adding this line if problem persists in loading weather data
    this.weatherdataService.loadWeatherData();
    // console.log('result ngOnInit');
    // console.log(this.weatherData);
  }


  getWeatherParam() {}

  onFavClick() {
    if (this.isFavourite) {
      this.favoritesService.removeFavorite(this.favoritesService.curFav.key);
    } else {
      this.isFavourite = true;
      this.favoritesService.setFavorite();
    }
  }

  tweet() {
    const city = this.weatherdataService.getWeatherParams().city;
    const temp = this.weatherData.currently.temperature;
    const summary = this.weatherData.currently.summary;
    // console.log(city);
    // console.log(temp);
    // console.log(summary);
    let url = "https://twitter.com/intent/tweet?text=";
    url += `The current temperature at ${city} is ${temp}%C2%B0 F. The weather conditions are ${summary}.
    %23CSCI571WeatherSearch`;
    window.open(url, '_blank');
  }

  // ngOnDestroy() {
  //   this.weatherdataSub.unsubscribe();
  // }

}


  // getWeatherData() {
  //   console.log('getWeatherData called');
  //   // this.weatherdataService.getWeatherData().subscribe((data) => {
  //   //   this.weatherData = data;
  //   // });
  //   this.weatherdataService.getWeatherData();
  //   console.log(this.weatherdataService.getWeatherData());
  // }

