import { Injectable, OnInit } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user, UserCredential } from '@angular/fire/auth';
import { from, Observable, } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import { AuthentificationService } from './authentification.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject, PathReference } from '@angular/fire/compat/database';
import { Users } from '../components/signup/user.model';
import { Movies } from '../components/movies/movies.model';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class PostService implements OnInit{
  isAdmin: boolean 
  users: Users[];
  user?= this.authService.auth.currentUser;
  constructor(private authService: AuthentificationService, private db: AngularFireDatabase,public auth: Auth,private api: ApiService) {
    this.api.loadUsers().subscribe((result: Users[]) => {
      const values = Object.values(result);
      this.users = values;
      console.log(this.users)

      for (let i = 0; i < this.users.length; i++) {
        if (this.user?.email == this.users[i].email && this.users[i].role == "admin") {
     
          this.isAdmin =  this.users[i].hadAccess
        }
    
      }
      

    })

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  


  set Role(admin: boolean) {
    this.isAdmin = admin;
  }
  get Role(){
    return this.isAdmin
  }
  async chekcMovie(id:string,film:Movies[]) :Promise<boolean>{
    let isAlready:boolean =false
    for (const item of Object.values(film)) {
      console.log(item.imdbID)
      if (item.imdbID == id) {
        isAlready=true
 
        console.log(isAlready)
      }

    }
    return isAlready

}
}
