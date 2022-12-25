import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Database, ref, update } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IdTokenResult } from '@angular/fire/auth';
import { ApiService } from './api.service';
import { Rent } from '../models/rents.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userToken = new Promise<IdTokenResult>(null);
  usersRef: AngularFireList<User>;
  itemRef: AngularFireObject<any>;
  items: Observable<any[]>;
  users: User[]
  hadAccess: boolean
  constructor(private db: AngularFireDatabase,private api: ApiService, public database: Database, private afAuth: AngularFireAuth) {

  
    this.usersRef = db.list('users');
    this.items = this.usersRef?.snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  async getUserClaims() {
    this.userToken = (await this.afAuth.currentUser).getIdTokenResult();
    return (await this.userToken);
  }

  getUsers() {
    return this.items;
  }
  pushUser(email: string, admin: boolean, user_id: string) {
    this.usersRef.push({
      email: email,
      admin: admin,
      user_id: user_id
    })
  }

  set Users(user: User[]) {
    this.users = user
  }
  get Users() {
    return this.users
  }
  // set Email(email: string) {
  //   this.email = email;
  // }
  // get Email() {
  //   return this.email
  // }

  // Count the number of movies rented by each user
  countRentalCounts(rents: Rent[], users: User[]): any[] {
    // Use reduce() to count the number of movies rented by each user
    const userRentalCounts = rents.reduce((counts, rental) => {
      if (counts[rental.userId]) {
        counts[rental.userId]++;
      } else {
        counts[rental.userId] = 1;
      }
      return counts;
    }, {});

    // Add the rental counts to each user object
    return users.map(user => {
      user.rentalCount = userRentalCounts[user.email] || 0;
      return user;
    });
  }
  }








