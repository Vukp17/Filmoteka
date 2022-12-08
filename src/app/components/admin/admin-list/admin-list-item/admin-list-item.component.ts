import { Component, Input, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-admin-list-item',
  templateUrl: './admin-list-item.component.html',
  styleUrls: ['./admin-list-item.component.css']
})
export class AdminListItemComponent implements OnInit {
  @Input() movies: Movie;
  film:any;
  constructor( private api: ApiService, private movieService: MovieService, private toastService: HotToastService) { }

  ngOnInit(): void {
    this.film = this.api.getMovies();
    console.log(this.movies)
    this.movieService.load();
  }
  async Push(movies: Movie, imdbID: string) {
    if (this.movieService.checkIfMovieExsist(imdbID)==true) {
      this.toastService.warning('Film vec postoji u bazi!');
    } else {
      this.api.pushMovie(movies)
      this.toastService.success('Uspenso si dodao film u bazu')
    }
  }
}
