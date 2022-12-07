import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ApiService } from 'src/app/services/api.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movies } from '../../../models/movies.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css'],
  providers: [MovieService,ApiService]
}) 
export class MovieListComponent implements OnInit,OnChanges {
  @Output() movieWasSelected = new EventEmitter<Movies>();
  movies:any;

  constructor(private api:ApiService,private afAuth: AngularFireAuth ) { }

  ngOnInit(): void {
   this.Ucitaj();
   this.isAdmin();
  }
  OnMovieSeleted(movie: Movies) {
       this.movieWasSelected.emit(movie);
  }
  Ucitaj(){
    this.movies = this.api.getMovies();
    console.log(this.movies)
  }
  ngOnChanges(){
    this.Ucitaj();
  }
  isAdmin(){
    this.afAuth.onAuthStateChanged((user) => {
      user?.getIdTokenResult().then((idtoken) => {
        console.log(idtoken.claims);
         return idtoken.claims['admin'];
      });
    });
    return false;
  }
}
