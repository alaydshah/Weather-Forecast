import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FavoritesComponent } from './favorites/favorites.component';
import { appRoutingModule } from './app.routing';
import { ChartsModule } from 'ng2-charts';
import { ModalModule } from 'ngx-bootstrap';
import { ModalComponent } from './modal/modal.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// import { CurrentComponent } from './results/current/current.component';
// import { HourlyComponent } from './results/hourly/hourly.component';
// import { WeeklyComponent } from './results/weekly/weekly.component';
// import { ResultsComponent } from './results/results.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    // ResultsComponent,
    FavoritesComponent,
    ModalComponent
    // CurrentComponent,
    // HourlyComponent,
    // WeeklyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    appRoutingModule,
    ChartsModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
