import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Movie } from '../models/movies.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService implements OnInit {
  movies: Movie[];
  isAdmin: boolean
  constructor(private http: HttpClient) { }
  ngOnInit(): void {

  }


}
