import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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

  constructor(private api: ApiService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.load();
    //  this.isAdmin();
  }
  onMovieSeleted(movie: Movie) {
    this.movieWasSelected.emit(movie);
  }
  load() {
    this.api.getMovies().subscribe(data => {
      this.movies = data
    });
    console.log(this.movies)
  }
  ngOnChanges() {
    this.load();
  }


  // isAdmin(){
  //   this.afAuth.onAuthStateChanged((user) => {
  //     user?.getIdTokenResult().then((idtoken) => {
  //        return idtoken.claims['admin'];
  //     });
  //   });
  //   return false;
  // }
}
