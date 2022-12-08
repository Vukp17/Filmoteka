import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Movie } from '../../../models/movies.model';

@Component({
  selector: 'app-admin-databse-list',
  templateUrl: './admin-databse-list.component.html',
  styleUrls: ['./admin-databse-list.component.css']
})
export class AdminDatabseListComponent implements OnInit {
  movies:any;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.loadMovies();
  }

  ngOnChanges(){
    this.loadMovies();
  }

  loadMovies(){
   this.movies = this.api.getMovies();
  }
}
