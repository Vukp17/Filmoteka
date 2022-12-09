import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService, ApiService]
})
export class MovieListComponent implements OnInit, OnChanges {

  @Output() movieWasSelected = new EventEmitter<Movie>();

  movies: Movie[];
  message:string;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadMovies();
  }
  onMovieSeleted(movie: Movie) {
    this.movieWasSelected.emit(movie);
  }
  loadMovies() {
    this.api.getMovies().subscribe(data => {
      if (data.length == 0) {
        this.message = 'Currently there is no movies available in our store.'
      }
      else {
        this.movies = data
      }
      
    });
  }
  ngOnChanges() {
    this.loadMovies();
  }

}
