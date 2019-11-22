import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../canvasjs.min.js';
import { WeatherdataService } from 'src/app/services/weatherdata.service';
import { Subscription, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {
  private weeklyDataPoints: any[] = [];
  private lat;
  private lon;
  private timestampArr = [];

  constructor(private weatherdataService: WeatherdataService) { }

  // public barChartLabels = [];
  // public barChartType = 'horizontalBar';
  // public barChartLegend = true;
  // public barChartOptions = {
  //   scaleShowVerticalLines: false,
  //   responsive: true
  // };
  // public barCharData = [
  //   {data: [], label: 'Day wise temperature range'}
  // ];

  ngOnInit() {
    this.populateData();
    this.generateChart();
  }

  generateChart() {
    console.log(this.weeklyDataPoints);
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      title: {
        text: 'Weekly Weather'
      },
      axisX: {
        title: 'Days'
      },
      axisY: {
        includeZero: false,
        title: 'Temperature in Fahrenheit',
        gridThickness: 0,
        interval: 10,
      },
      dataPointWidth: 16,
      data: [{
        click: async (e) => {
          console.log(e.dataPointIndex);
          let modalData;
          this.weatherdataService.getModaldataListener().subscribe((data) => {
            modalData = data;
            console.log(modalData);
            this.generateCard(modalData);

          });
          this.weatherdataService.fetchModalData(e.dataPointIndex);
        },
        color: 'rgb(165, 209, 238)',
        type: 'rangeBar',
        showInLegend: true,
        yValueFormatString: '#0',
        indexLabel: '{y[#index]}',
        legendText: 'Day wise temperature range',
        toolTipContent: '<b>{label}</b>: {y[0]} to {y[1]}',
        dataPoints: this.weeklyDataPoints
      }],
      legend: {
        verticalAlign: 'top'
      },
    });
    chart.render();
    }

// '%C2%B0'

    populateData() {
      const weeklyData = this.weatherdataService.getParameterData('daily').data;
      const data = this.weatherdataService.getWeatherData();
      this.lat = data.latitude;
      this.lon = data.longitude;
      const offset = data.offset;
      console.log(offset);
      if (weeklyData) {
        let i;
        console.log(weeklyData.length);

        for (i = 0; i < 8; i++) {
          const unixTstamp = weeklyData[i].time;
          this.timestampArr.push(unixTstamp);
          console.log(unixTstamp);
          const time = new Date(unixTstamp * 1000 + offset * 3600000);
          const year = time.getUTCFullYear();
          const month = time.getUTCMonth() + 1;
          const day = time.getUTCDate();
          const date = year + '-' + month + '-' + day;
          const item = {
            x: i,
            y: [weeklyData[i].temperatureLow, weeklyData[i].temperatureHigh],
            label: date,
          };
          // console.log(item);
          this.weeklyDataPoints.push(item);
        }
      }
    }

    generateCard(data) {
      console.log(data);
    }
  }
