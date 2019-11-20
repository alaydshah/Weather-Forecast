import { Component, OnInit, Input } from '@angular/core';
import { WeatherdataService } from 'src/app/weather-data/weatherdata.service';

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

  private selectedLevel = 'temperature';

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barCharData = [
    {data: [], label: 'Series A'}
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
    console.log(this.weatherdataService.getParameterData(this.selectedLevel));

    this.barCharData[0].data = this.weatherdataService.getParameterData(this.selectedLevel);
  }

  // console.log(this.weatherdataService.)

}
