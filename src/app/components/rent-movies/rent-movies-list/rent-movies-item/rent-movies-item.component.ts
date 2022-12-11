import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';
import { Rent } from 'src/app/models/rents.model';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent-movies-item',
  templateUrl: './rent-movies-item.component.html',
  styleUrls: ['./rent-movies-item.component.css'],
})
export class RentMoviesItemComponent implements OnInit {
  @Input() movie: Movie;

  email: string;

  rentsForUser: Rent[]
  rentToDelete: string[]

  rentDeleteKey: string
  movieToDelete: string

  rentsIds: Array<string>
  display: boolean=false;

  constructor(private api: ApiService, private userService: UserService) {
    this.email = this.userService.Email
  }

  ngOnInit(): void {
    this.getListWithId()
  }

  getListWithId() {
    this.api.getRentsByUser(this.email).subscribe(data => {
      this.rentsForUser = data;
      // console.log(data)
    })
  }

  returnMovie(idMovie) {
    this.api.getRentLocation(this.email,idMovie).subscribe(data => {
      data.forEach(element => {
        this.rentDeleteKey = element.toString();
        this.movieToDelete = idMovie;
      });
      this.returnMovieBack()
    })
  }
  
  returnMovieBack() {
    if (this.rentDeleteKey != undefined){
      this.api.returnMovie(this.movieToDelete , this.rentDeleteKey)
    }
  }

  returnDaysLeft() {
    const isoString = Date.parse(this.movie.date);
    const rentDate = new Date(isoString);
    let now = new Date();
    console.log(now)
    let daysLeft =
      30 -
      Math.trunc((now.getTime() - rentDate.getTime()) / (1000 * 3600 * 24));
    return daysLeft;
  }
  showDialog() {
    this.display = true;
  }

}
