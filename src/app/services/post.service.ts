import { Injectable, OnInit } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user, UserCredential } from '@angular/fire/auth';
import { from, Observable, } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { map, switchMap } from 'rxjs/operators';
import * as _ from 'lodash';
import * as firebase from 'firebase/app';
import { AngularFireDatabase, AngularFireList, AngularFireObject, PathReference } from '@angular/fire/compat/database';

import { Movie } from '../models/movie.model';
import { ApiService } from './api.service';
@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  constructor( private db: AngularFireDatabase,public auth: Auth,private api: ApiService) {
    
    }
  
}
