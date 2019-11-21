import { Component, OnInit } from '@angular/core';
import { WeatherdataService } from 'src/app/weather-data/weatherdata.service';
import * as CanvasJS from '../canvasjs.min.js';
@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.css']
})
export class WeeklyComponent implements OnInit {

  constructor(private weatherdataService: WeatherdataService) { }

  public barChartLabels = [];
  public barChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barCharData = [
    {data: [], label: 'Day wise temperature range'}
  ];

  ngOnInit() {
    this.generateChart();
  }

  generateChart() {
    const chart = new CanvasJS.Chart('chartContainer', {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: 'Employees Salary in a Company'
      },
      axisX: {
        title: 'Departments'
      },
      axisY: {
        includeZero: false,
        title: 'Salary in USD',
        interval: 10,
        suffix: 'k',
        prefix: '$'
      },
      data: [{
        type: 'rangeBar',
        showInLegend: true,
        yValueFormatString: '$#0.#K',
        indexLabel: '{y[#index]}',
        legendText: 'Department wise Min and Max Salary',
        toolTipContent: '<b>{label}</b>: {y[0]} to {y[1]}',
        dataPoints: [
          { x: 10, y: [80, 115], label: 'Data Scientist' },
          { x: 20, y: [95, 141], label: 'Product Manager' },
          { x: 30, y: [98, 115], label: 'Web Developer' },
          { x: 40, y: [90, 160], label: 'Software Engineer' },
          { x: 50, y: [100, 152], label: 'Quality Assurance' }
        ]
      }]
    });
    chart.render();
    }

  }

// const weeklyData = this.weatherdataService.getParameterData('daily').data;

// if (weeklyData) {
//   let i;

//   for (i = 0; i < weeklyData.length; i++) {
//     const temp = [];
//     temp.push(weeklyData[i].temperatureLow);
//     temp.push(weeklyData[i].temperatureHigh);
//     this.barCharData[0].data.push(temp);
//     this.barChartLabels.push(i);
//   }
// }
// console.log(this.barCharData[0].data);

// }

  // var unix_tstamp = daily_data[key];
  //                                   var offset = json_data.offset;
  //                                   var time = new Date(unix_tstamp*1000 + offset * 3600000);
  //                                   var year = time.getUTCFullYear();
  //                                   var month = time.getUTCMonth() + 1;
  //                                   var day = time.getUTCDate();

  //                                   var date = year + '-' + month + '-' + day;
