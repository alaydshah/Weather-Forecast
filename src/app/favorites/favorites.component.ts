import { Component, OnInit } from '@angular/core';
import { FavoriteService } from '../services/favorite.service';
import { Subscription } from 'rxjs';
import { Favorite } from './favorite';
import { WeatherdataService } from '../services/weatherdata.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})

export class FavoritesComponent implements OnInit {

  private favLength;
  private favorites: Favorite[];
  private favArrSub: Subscription;

  constructor(private favoriteService: FavoriteService,
              private weatherdataService: WeatherdataService) { }

  ngOnInit() {
    this.favoriteService.genFavArray();

    this.favArrSub = this.favoriteService.getfavArrayListener()
      .subscribe((data) => {
        this.favorites = data;
        this.favLength = this.favorites.length;
      });

    this.favoriteService.loadFavData();
  }

  removeFavorite(key) {
    this.favoriteService.removeFavorite(key);
  }

  fetchWeather(fav: Favorite) {
    this.weatherdataService.onClear();
    console.log('clicked');
    this.weatherdataService.fetchWeatherData('', fav.city, fav.state, true, fav.lat, fav.lon);
  }
}
