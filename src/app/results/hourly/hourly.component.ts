import { Component, OnInit, Input } from '@angular/core';
import { WeatherdataService } from 'src/app/services/weatherdata.service';
// import { WeatherdataService } from 'src/app/weather-data/weatherdata.service';

@Component({
  selector: 'app-hourly',
  templateUrl: './hourly.component.html',
  styleUrls: ['./hourly.component.css']
})

export class HourlyComponent implements OnInit {

  // @Input() data;
  private parameterOptions = [{name: 'Temperature', value: 'temperature'},
                              {name: 'Pressure', value: 'pressure'},
                              {name: 'Humidity', value: 'humidity'},
                              {name: 'Ozone', value: 'ozone'},
                              {name: 'Visibility', value: 'visibility'},
                              {name: 'Wind Speed', value: 'windSpeed'}];

  private selectedLevel = this.parameterOptions[0];

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,

  };
  public barCharData = [
    {data: [], label: this.selectedLevel.name, backgroundColor: 'rgb(165, 209, 238)'}
  ];

  constructor(private weatherdataService: WeatherdataService) { }

  ngOnInit() {
    this.initializeLabels();
    this.generateChart();
  }

  initializeLabels() {
    let i;
    for (i = 0; i < 24; i++) {
      const label = i + '';
      this.barChartLabels.push(label);
    }
    console.log(this.barChartLabels);
  }

  generateChart() {
    console.log(this.selectedLevel);
    const hourlyData = this.weatherdataService.getParameterData('hourly').data;
    console.log(hourlyData);
    const hourlyParamData = [];
    if (hourlyData) {
      let i = 0;
      for (i = 0; i < 24; i++) {
        hourlyParamData.push(hourlyData[i][this.selectedLevel.value]);
      }
    }

    this.barCharData[0].data = hourlyParamData;
    this.barCharData[0].label = this.selectedLevel.name;
  }

}
