import { Component, OnInit, Input } from '@angular/core';
import { WeatherdataService } from '../weather-data/weatherdata.service';
import { Subscription, Observable, Subject } from 'rxjs';
import { WeatherData } from '../weather-data/weather-data';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit {

  // @Input() weatherData;


  constructor(private weatherdataService: WeatherdataService) {

   }

   private weatherData;
   private weatherdataSub: Subscription;

  ngOnInit() {
    this.weatherdataSub = this.weatherdataService.getWeatherdataListener().subscribe((data) => {
      this.weatherData = data;
      // console.log(this.weatherData);
    });

    //TODO: Cosider adding this line if problem persists in loading weather data
    // this.getWeatherData();

    // console.log('result ngOnInit');
    // console.log(this.weatherData);
  }

  getWeatherData() {
    console.log('getWeatherData called');
    // this.weatherdataService.getWeatherData().subscribe((data) => {
    //   this.weatherData = data;
    // });
    this.weatherdataService.getWeatherData();
    console.log(this.weatherdataService.getWeatherData());
  }

  tweet() {
    let url = "https://twitter.com/intent/tweet?text=";
    url += `Check out ${this.details.name} at ${
      this.details.formatted_address
    }. Website: `;
    url += "&hashtags=TravelAndEntertainmentSearch";
    url += "&url=" + this.details.website;
    var newWin = window.open(url, "tweet", "height=600, width=600");
  }

  // ngOnDestroy() {
  //   // this.weatherdataSub.unsubscribe();
  // }

}
