import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements OnInit {
  movies: Movie[];
  isAdmin: boolean
  constructor(private api: ApiService) { }
  ngOnInit(): void {
    this.load();
  }
  checkIfMovieExsist(imdbID: string): boolean {
    let isExist: boolean = false;
    for (let item of this.movies) {
      if (item.imdbID == imdbID) {
        isExist = true
      }
    }
    console.log(isExist)
    return isExist
  }
  
  load() {
    this.api.getMovies().subscribe(data => {
      this.movies = data
      console.log(this.movies)
    });
  }
}
