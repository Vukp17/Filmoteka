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
  @Input() movie: Movie;
  display: boolean = false;
  constructor(private api: ApiService, private movieService: MovieService, private toastService: HotToastService) { }

  ngOnInit(): void {
    this.movieService.load()
  }
  pushMovie(movies: Movie, imdbID: string) {
    if (this.movieService.checkIfMovieExsist(imdbID) == true) {
      this.toastService.warning('Instance of this movie is already in database');
    } else {
      this.api.pushMovie(movies)
      this.toastService.success('You have successefully added this movie to database')
    }
  }
  showDialog(){
    this.display= true;
  }
}
