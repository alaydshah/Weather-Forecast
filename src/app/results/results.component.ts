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
    this.getWeatherData();
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





  // ngOnDestroy() {
  //   // this.weatherdataSub.unsubscribe();
  // }

}
