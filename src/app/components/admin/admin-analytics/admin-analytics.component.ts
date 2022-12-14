import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, shareReplay } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { Rent } from 'src/app/models/rents.model';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css'],
})
export class AdminAnalyticsComponent implements OnInit {
  usersObservable: Observable<User[]>;
  users: User[];
  rents: Rent[];
  rentsObservable: Observable<Movie[]>;
  user: User;

  constructor(private api: ApiService, private authService: AuthService) { }


  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 
  // UNFINISHED COMPONENT 

  ngOnInit(): void {
  // this.loadALL()
    // console.log(this.users);
    this.loadALL()
  }

  getUsers() {
    this.api.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  userMovieRentals() {
    this.api.getRents().subscribe(data => {

      this.rents = data;
      console.log(this.rents);
    })
  }
  loadALL() {
this.userMovieRentals()
      this.api.getUsers().subscribe((data) => {
        this.users = data;
        
        // Use reduce() to count the number of movies rented by each user
        const userRentalCounts = this.rents.reduce((counts, rental) => {
          if (counts[rental.userId]) {
            counts[rental.userId]++;
          } else {
            counts[rental.userId] = 1;
          }
          console.log(counts)
          return counts;
          
        }, {});
    
        // Add the rental counts to each user object
        this.users = this.users.map(user => {
          user.rentalCount = userRentalCounts[user.email] || 0;
          return user;
        });
    
        console.log(this.users);
      });
    
  }
}
