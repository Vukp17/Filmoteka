import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userLoggedIn: boolean; // other components can check on this variable for the login status of the user
 
  user = new BehaviorSubject<User | null>(null);
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
   

    this.afAuth.onAuthStateChanged((user) => {
      // set up a subscription to always know the login status of the user
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }

  get userObject(){
return this.user;
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        // this.router.navigate(['/dashboard']);
        this.afAuth.onAuthStateChanged((user) => {
          user?.getIdTokenResult().then((idtoken) => {
        //   console.log(idtoken.claims['admin']);
      //     console.log(typeof(idtoken.claims['admin']))
             const currnetUser = new User(idtoken.claims['admin'],idtoken.claims['user_id'],idtoken.claims['email']);
             this.user.next(currnetUser);
          });
        });
        console.log();
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }

  signupUser(user: any): Promise<any> {
    return this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        let emailLower = user.email.toLowerCase();
        result.user?.sendEmailVerification(); // immediately send the user a verification email
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }
  
  isAdmin(){
    this.afAuth.onAuthStateChanged((user) => {
      user?.getIdTokenResult().then((idtoken) => {
      // console.log(idtoken.claims['admin']);
     //  console.log(typeof(idtoken.claims['admin']))
         return idtoken.claims['admin'];
      });
    });
    return null;
  }

  }