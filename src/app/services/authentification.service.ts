import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user, UserCredential } from '@angular/fire/auth';
import { from, Observable, switchMap } from 'rxjs';
import {BehaviorSubject} from 'rxjs';



import * as firebase from 'firebase/app'
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})

export class AuthentificationService {
 
  userRoles: Array<string>;
  currentUser$=authState(this.auth);
  constructor(public auth: Auth,private db: AngularFireDatabase) {
  }
  
  login(username: string, password: string) {
    
    return from(signInWithEmailAndPassword(this.auth, username, password));
  
  }
  signUp(name:string,email: string, password: string) {
    return from(createUserWithEmailAndPassword(this.auth, email, password)
    ).pipe(
     switchMap(({ user }) => updateProfile(user,{displayName:name}))
    );
  }
  logout() {
    return from((this.auth.signOut()));
  }
  }