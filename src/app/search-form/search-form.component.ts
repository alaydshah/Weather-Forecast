import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SearchForm } from './search-form';
import { SearchService } from './search.service';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { WeatherdataService } from '../weather-data/weatherdata.service';
// import { HeroService } from '../hero.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  states = [{name: 'Select State', value: ''},
            {name: 'Alabama', value: 'AL'},
            {name: 'Alaska', value: 'AK'},
            {name: 'Arizona', value: 'AZ'},
            {name: 'Arkansas', value: 'AR'},
            {name: 'California', value: 'CA'},
            {name: 'Colorado', value: 'CO'},
            {name: 'Connecticut', value: 'CT'},
            {name: 'Delaware', value: 'DE'},
            {name: 'District of Columbia', value: 'DC'},
            {name: 'Florida', value: 'FL'},
            {name: 'Georgia', value: 'GA'},
            {name: 'Hawaii', value: 'HI'},
            {name: 'Idaho', value: 'ID'},
            {name: 'Illinois', value: 'IL'},
            {name: 'Indiana', value: 'IN'},
            {name: 'Iowa', value: 'IA'},
            {name: 'Kansas', value: 'KS'},
            {name: 'Kentucky', value: 'KY'},
            {name: 'Louisiana', value: 'LA'},
            {name: 'Maine', value: 'ME'},
            {name: 'Maryland', value: 'MD'},
            {name: 'Massachusetts', value: 'MA'},
            {name: 'Michigan', value: 'MI'},
            {name: 'Minnesota', value: 'MN'},
            {name: 'Mississippi', value: 'MS'},
            {name: 'Missouri', value: 'MO'},
            {name: 'Montana', value: 'MT'},
            {name: 'Nebraska', value: 'NE'},
            {name: 'Nevada', value: 'NV'},
            {name: 'New Hampshire', value: 'NH'},
            {name: 'New Jersey', value: 'NJ'},
            {name: 'New Mexico', value: 'NM'},
            {name: 'New York', value: 'NY'},
            {name: 'North Carolina', value: 'NC'},
            {name: 'North Dakota', value: 'ND'},
            {name: 'Ohio', value: 'OH'},
            {name: 'Oklahoma', value: 'OK'},
            {name: 'Oregon', value: 'OR'},
            {name: 'Pennsylvania', value: 'PA'},
            {name: 'Rhode Island', value: 'RI'},
            {name: 'South Carolina', value: 'SC'},
            {name: 'South Dakota', value: 'SD'},
            {name: 'Tennessee', value: 'TN'},
            {name: 'Texas', value: 'TX'},
            {name: 'Utah', value: 'UT'},
            {name: 'Vermont', value: 'VT'},
            {name: 'Virginia', value: 'VA'},
            {name: 'Washington', value: 'WA'},
            {name: 'West Virginia', value: 'WV'},
            {name: 'Wisconsin', value: 'WI'},
            {name: 'Wyoming', value: 'WY'},
          ];

  // queryStreet = '';
  // queryCity = '';
  // queryState = '';
  formQuery = SearchForm;

  // submitted = false;



  constructor(private searchService: SearchService,
              private weatherdataService: WeatherdataService,
              private http: HttpClient) { }

  ngOnInit() {
    // this.heroService.check();
    this.searchService.checkService();
    const currLocUrl = 'http://ip-api.com/json';
    this.http.get(currLocUrl).subscribe(
      response => this.formQuery.currLocJson = response
    );
  }

  // onSubmit() {
  //   this.submitted = true;
  // }

  // resetForm(form): void {
  // }

  onCurrCheck(form): void {
    const locFlag = form.value.currLoc;
    if (!locFlag) {
      form.reset({
        state: '',
        currLoc: true
      });
    }
  }


  onSubmit() {
    console.log(this.formQuery.currLocJson);
    console.log(this.formQuery.currLocJson.lat);
    console.log(this.formQuery.currLocJson.lon);
    this.searchService.searchQuery(this.formQuery);
  }

  onClear() {
    console.log('Search Form Component clear fired');
    this.weatherdataService.onClear();
  }
}
