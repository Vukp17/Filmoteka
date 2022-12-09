import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rent-movies-list',
  templateUrl: './rent-movies-list.component.html',
  styleUrls: ['./rent-movies-list.component.css']
})
export class RentMoviesListComponent implements OnInit {
  movies:Movie[];
  message: string;
  
  constructor(private api:ApiService,private authService:AuthService) { }

  ngOnInit(): void {
    this.loadRentedMovies()
  }
  
  loadRentedMovies(){
     this.api.getRents().subscribe(data =>{
      if (data.length == 0) {
        this.message = 'You dont have any rented movies at the moment.'
      }
      else {
        this.movies = data
      }
    });
  }
}
