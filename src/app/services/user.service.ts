import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Database, ref, update } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Users } from '../components/signup/user.model';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  usersRef: AngularFireList<Users>;
  itemRef: AngularFireObject<any>;
  items: Observable<any[]>;
  users: Users[]
  email: string
  hadAccess: boolean
  constructor(private db: AngularFireDatabase, public database: Database, private http: HttpClient) {
    this.email = ""
    this.usersRef = db.list('users');
    this.items = this.usersRef?.snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }
  getUsers() {
    return this.items;
  }
  pushUser(email: string, password: string, role: string) {
    this.usersRef.push({
      email: email,
      password: password,
      role: role,
      hadAccess: false

    });


  }

  set Access(hadAccess: boolean) {
    this.hadAccess = hadAccess
  }
  get Access() {
    return this.hadAccess
  }


  set Users(user: Users[]) {
    this.users = user
  }
  get Users() {
    return this.users
  }
  set Email(email: string) {
    this.email = email;
  }
  get Email() {
    return this.email
  }
}





