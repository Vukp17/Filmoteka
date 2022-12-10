import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-analytics',
  templateUrl: './admin-analytics.component.html',
  styleUrls: ['./admin-analytics.component.css'],
})
export class AdminAnalyticsComponent implements OnInit {
  usersObservable: Observable<User[]>;
  users: User[];
  user: User;

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getUsers();
  }

  //get users
  getUsers() {
    this.api.loadUsers().subscribe(data => {
     this.users = data;
     console.log(this.users);
    });
  }
}
