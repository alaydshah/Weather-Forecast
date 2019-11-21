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
    // this.getWeatherData();

    // console.log('result ngOnInit');
    // console.log(this.weatherData);
  }


  getWeatherParam() {}

  onFavClick() {
    if (this.isFavourite) {
      this.favoritesService.removeFavorite();
    } else {
      this.isFavourite = true;
      this.favoritesService.setFavorite();
    }
  }

  // tweet() {
  //   let url = "https://twitter.com/intent/tweet?text=";
  //   url += `Check out ${this.details.name} at ${
  //     this.details.formatted_address
  //   }. Website: `;
  //   url += "&hashtags=TravelAndEntertainmentSearch";
  //   url += "&url=" + this.details.website;
  //   var newWin = window.open(url, "tweet", "height=600, width=600");
  // }

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

