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

  availableMovies: Movie[]
  message: string;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.loadAvailableMovies()
  }
  onMovieSeleted(movie: Movie) {
    this.movieWasSelected.emit(movie);
  }

  loadAvailableMovies() {
    this.api.getAvailableMovies().subscribe(data => {
      this.availableMovies = data
      if (data.length == 0) {
        this.message = 'Currently there is no movies available in our store.'
      }
      else {
        this.availableMovies = data
      }
    })
  }

  ngOnChanges() {
    this.loadAvailableMovies()
  }

}
