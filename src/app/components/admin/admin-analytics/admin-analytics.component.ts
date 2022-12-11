import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, shareReplay } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css'],
})
export class AdminAnalyticsComponent implements OnInit {
  usersObservable: Observable<User[]>;
  users: User[];
  rents: Movie[];
  rentsObservable: Observable<Movie[]>;
  user: User;

  constructor(private api: ApiService, private authService: AuthService) {}

  ngOnInit(): void {
    this.getUsers();
    
    this.userMovieRentals();
    console.log(this.users);
  }

  getUsers() {
    this.api.getUsers().subscribe((data) => {
      this.users = data;
    });
  }
getRentals() {
    this.api.getRents().subscribe((data) => {
      this.rents = data;

    });
  }
  userMovieRentals() {
    this.users.forEach(item => {
      // Add a new attribute to each item in the array
      item.moviesRented = '3';
    });
    console.log(this.users);
  }
}