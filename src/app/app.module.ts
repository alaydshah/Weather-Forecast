import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { HttpClientModule } from '@angular/common/http';

import { FavoritesComponent } from './favorites/favorites.component';
import { appRoutingModule } from './app.routing';
import { ChartsModule } from 'ng2-charts';

// import { CurrentComponent } from './results/current/current.component';
// import { HourlyComponent } from './results/hourly/hourly.component';
// import { WeeklyComponent } from './results/weekly/weekly.component';
// import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    // ResultsComponent,
    FavoritesComponent
    // CurrentComponent,
    // HourlyComponent,
    // WeeklyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    appRoutingModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
