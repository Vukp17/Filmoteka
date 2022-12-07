import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Movies } from '../../../models/movies.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  movies: Movies[];
  inputValue: string;
  search:string;
  constructor(private http: HttpClient, private api: ApiService) { }

  ngOnInit(): void {

    // ovde dodati enter your movie paramaeters
  }

  ngOnChanges():void {
    this.loadMovies()
  }
  loadMovies() {
    this.api.adminLoadMovies(this.search)
    .subscribe((result) => {
      this.movies = result.Search
    })
  }

}
