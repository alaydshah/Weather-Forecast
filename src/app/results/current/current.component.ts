import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})
export class CurrentComponent implements OnInit {
  private city;
  private timeZone;
  private temperature;
  private weather;
  private seal;
  constructor() { }

  ngOnInit() {
    this.city = 'Los Angeles';
    this.timeZone = 'America/Los Angeles';
    this.temperature = '75';
    this.weather = 'Clear';
    this.seal = 'https://source.unsplash.com/daily?nature';
  }



}
