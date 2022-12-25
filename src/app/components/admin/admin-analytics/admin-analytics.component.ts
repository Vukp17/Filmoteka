import { Component, OnChanges, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, shareReplay } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Rent } from 'src/app/models/rents.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css'],
})
export class AdminAnalyticsComponent implements OnInit,OnChanges {
  usersObservable: Observable<User[]>;
  users: User[];
  rents: Rent[];
  rentsObservable: Observable<Movie[]>;
  user: User;

  constructor(private api: ApiService, private userService: UserService) { }
  ngOnChanges(){
    this.loadUsers()

  }
  ngOnInit(): void {
    this.loadUsers()
  }

  userMovieRentals() {
    this.api.getRents().subscribe(data => {
      this.rents = data;   
     })
  }
  loadUsers() {
    this.userMovieRentals()
    this.api.getUsers().subscribe((data) => {
      this.users = data;
      this.users = this.userService.countRentalCounts(this.rents, this.users);
    });
  }
}
