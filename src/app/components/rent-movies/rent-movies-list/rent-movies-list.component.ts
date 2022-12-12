import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Rent } from 'src/app/models/rents.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent-movies-list',
  templateUrl: './rent-movies-list.component.html',
  styleUrls: ['./rent-movies-list.component.css']
})
export class RentMoviesListComponent implements OnInit {

  rents:Rent[];
  moviesForUser: Movie[]
  movieIds: Array<string>
  message: string;
 
  constructor(private api:ApiService,private userService: UserService,private authService: AuthService) { }

  ngOnInit(): void {
   
    this.loadUserRentedMovies()
  }
  ngOnChanges(){
    this.loadUserRentedMovies
  }

  loadUserRentedMovies() {
    this.api.getCurrUserRented(this.authService.userEmail).subscribe(data =>{
      this.movieIds = data
      this.loadMovies();
    })
  }

  loadMovies(){
    this.api.getCurrUserRentedMovies(this.movieIds).subscribe(data =>{
      if (data.length == 0) {
        this.message = 'Currently you have no rented movies'
        this.moviesForUser = data
      }
      else {
        this.moviesForUser = data
      }
    })
  }


}
