import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-db-list',
  templateUrl: './admin-db-list.component.html',
  styleUrls: ['./admin-db-list.component.css']
})
export class AdminDbListComponent implements OnInit {

  movies:Movie[];

  rentedMovies: Movie[];
  unrentedMovies: Movie[];



  constructor(private api:ApiService) { }

  ngOnInit(): void {
    this.loadMovies();
    this.loadRentedMovies();
    this.loadUnrentedMovies();
  }

  ngOnChanges(){
    this.loadMovies();
  }

  loadRentedMovies() {
   this.api.getRentedMovies().subscribe(data =>{
    this.rentedMovies = data;
   })
  }

  loadUnrentedMovies() {
    this.api.getUnrentedMovies().subscribe(data => {
      this.unrentedMovies = data;
    })
  }
 
  loadMovies(){
    this.api.getMovies().subscribe(data =>{
      this.movies = data
    });
  }
}
