import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-rent-movies',
  templateUrl: './rent-movies.component.html',
  styleUrls: ['./rent-movies.component.css']
})
export class RentMoviesComponent implements OnInit {
  @Input() movies: Movie;
  constructor() { }

  ngOnInit(): void {
  }

}
