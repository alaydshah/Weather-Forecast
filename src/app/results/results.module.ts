import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResultsRoutingModule } from './results-routing.module';
import { ResultsComponent } from './results.component';
import { CurrentComponent } from './current/current.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    ResultsComponent,
    CurrentComponent,
    HourlyComponent,
    WeeklyComponent
  ],
  imports: [
    CommonModule,
    ResultsRoutingModule,
    ChartsModule
  ]
})
export class ResultsModule { }
