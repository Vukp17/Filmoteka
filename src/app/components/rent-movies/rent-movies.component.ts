import { Component, Input, OnInit } from '@angular/core';
import { Movies } from '../movies/movies.model';

@Component({
  selector: 'app-rent-movies',
  templateUrl: './rent-movies.component.html',
  styleUrls: ['./rent-movies.component.css']
})
export class RentMoviesComponent implements OnInit {
  @Input() movies: Movies;
  constructor() { }

  ngOnInit(): void {
  }

}
