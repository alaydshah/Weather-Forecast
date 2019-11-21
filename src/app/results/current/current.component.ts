import { Component, OnInit } from '@angular/core';
import { WeatherdataService } from 'src/app/services/weatherdata.service';
import { generate } from 'rxjs';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  private city;
  private timeZone;
  private temperature;
  private seal;
  private summary;
  private humidity;
  private pressure;
  private windSpeed;
  private visibility;
  private cloudCover;
  private ozone;
  private currentWeatherData;
  private weatherData;
  private weatherParams;

  constructor(private weatherdataService: WeatherdataService) { }

  ngOnInit() {
    this.weatherData = this.weatherdataService.getWeatherData();
    this.currentWeatherData = this.weatherdataService.getParameterData('currently');
    this.weatherParams = this.weatherdataService.getWeatherParams();
    this.populateCardParams();
  }

  populateCardParams() {
    this.city = this.weatherParams.city;
    this.timeZone = this.weatherData.timezone;
    console.log(this.currentWeatherData);
    this.temperature = Math.round(this.currentWeatherData.temperature);
    this.summary = this.currentWeatherData.summary;
    this.humidity = this.currentWeatherData.humidity;
    this.pressure = this.currentWeatherData.pressure;
    this.windSpeed = this.currentWeatherData.windSpeed;
    this.visibility = this.currentWeatherData.visibility;
    this.cloudCover = this.currentWeatherData.cloudCover;
    this.ozone = this.currentWeatherData.ozone;
  }



}
