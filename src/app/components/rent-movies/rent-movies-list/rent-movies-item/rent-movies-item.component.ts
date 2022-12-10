import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rent-movies-item',
  templateUrl: './rent-movies-item.component.html',
  styleUrls: ['./rent-movies-item.component.css'],
})
export class RentMoviesItemComponent implements OnInit {
  @Input() movies: Movie;

  constructor(private api: ApiService) {}

  ngOnInit(): void {}

  returnMovie(key: any, id: any) {
    this.api.returnMovie(key, id);
  }
  returnDaysLeft() {
    const isoString = Date.parse(this.movies.date);
    const rentDate = new Date(isoString);
    let now = new Date();
    let daysLeft =
      30 -
      Math.trunc((now.getTime() - rentDate.getTime()) / (1000 * 3600 * 24));
  
      
      return daysLeft;
  }
}
