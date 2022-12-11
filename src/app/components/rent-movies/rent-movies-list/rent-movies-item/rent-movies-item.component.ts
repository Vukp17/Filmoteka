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
  rentsIds: Array<string>

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


  getRentLocation(idMovie) {
    this.api.getRentLocation(this.email,idMovie).subscribe(data => {
      this.rentToDelete = data // this returns ["-NIUXFHI2dceHtm1wxCp"] but
      console.log(this.rentToDelete.toString())
      this.api.returnMovie(idMovie , this.rentToDelete.toString())
    })
  }
  
  // returnMovie(key) {
  //   this.getRentLocation
  //   rentDeleteKey
  //   this.api.returnMovie(key,)
  // }


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
}
