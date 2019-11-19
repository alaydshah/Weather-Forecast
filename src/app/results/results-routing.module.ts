import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResultsComponent } from './results.component';
import { CurrentComponent } from './current/current.component';
import { HourlyComponent } from './hourly/hourly.component';
import { WeeklyComponent } from './weekly/weekly.component';


const routes: Routes = [
  {
    path: '', component: ResultsComponent, children: [
      {
        path: 'current', component: CurrentComponent
      },
      {
        path: 'hourly', component: HourlyComponent
      },
      {
        path: 'weekly', component: WeeklyComponent
      },
      {
        path: '', redirectTo: 'current', pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ResultsRoutingModule { }
