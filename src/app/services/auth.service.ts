import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { from, Observable, switchMap, take, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  userLoggedIn: boolean; // other components can check on this variable for the login status of the user

  uid: string = null;
  user: User = null;
  claims: any = {};
  isAdmin = false;
  userEmail: string;
  userEmailSubject = new Subject<string>();
  isLoggedInSubject = new Subject<boolean>();
  userSubject = new Subject();
  claimsSubject = new Subject();
  isAdminSubject = new Subject<boolean>();

  user1 = new BehaviorSubject<User | null>(null);
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
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

  getAuthState() {
    this.afAuth.authState
      .subscribe(
        authUser => {

          if (authUser) { // logged in
            this.isLoggedInSubject.next(true);
            this.uid = authUser.uid;
            this.userEmail = authUser.email;
            this.claims = authUser.getIdTokenResult()
              .then(idTokenResult => {
                this.claims = idTokenResult.claims;
                this.isAdmin = this.hasClaim('admin');
                console.log(this.hasClaim('admin'));
                this.userEmailSubject.next(this.userEmail);
                this.isAdminSubject.next(this.isAdmin);
                this.claimsSubject.next(this.claims);
              });

          }
          else { // logged out
            console.log('Auth Service says: no User is logged in.');
          }
        }
      );
  }

  hasClaim(claim): boolean {
    return !!this.claims[claim];
  }
  resetState() {
    this.uid = null;
    this.claims = {};
    this.user = null;
    this.isAdmin = false;

    this.isLoggedInSubject.next(false);
    this.isAdminSubject.next(false);
    this.claimsSubject.next(this.claims);
    this.userSubject.next(this.user);
  }


  get userObject() {
    return this.user1;
  }
  autoLogin() {
    this.getAuthState();
  }


  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.onAuthStateChanged((user) => {
          user?.getIdTokenResult().then((idtoken) => {
            this.getAuthState();
          });
        });
      })
      .catch((error) => {
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



}