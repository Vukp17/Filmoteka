import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Rent } from 'src/app/models/rents.model';
import { ApiService } from 'src/app/services/api.service';
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
  email: string
  constructor(private api:ApiService,private userService: UserService) { }

  ngOnInit(): void {
    this.email=this.userService.Email
    this.loadUserRentedMovies()
  }

  loadUserRentedMovies() {
    this.api.getCurrUserRented(this.email).subscribe(data =>{
      this.movieIds = data
      this.loadMovies();
    })
  }

  loadMovies(){
    console.log(this.movieIds)
    this.api.getCurrUserRentedMovies(this.movieIds).subscribe(data =>{
      this.moviesForUser = data
    })
  }


}
