import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Movie } from '../../../models/movie.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  movies: Movie[];
  search: string;
  error: string = 'Please enter your search!';

  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.loadMovies()
  }

  loadMovies() {
    this.api.adminLoadMovies(this.search)
      .subscribe((result) => {
        this.movies = result.Search
        this.error = result.Error
      })
  }


}
