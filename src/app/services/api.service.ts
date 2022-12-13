import { Injectable, OnChanges, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { filter, map, Observable } from 'rxjs';
import { Database, object, ref, update } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import {
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Rent } from '../models/rents.model';
import { Detail } from '../models/movieById.model';
@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit, OnChanges {

  moviesRef: AngularFireList<Movie>;
  itemsMovies: Observable<Movie[]>;

  rentsRef: AngularFireList<Rent>;
  itemsRents: Observable<Rent[]>;

  usersRef: AngularFireList<User>;
  itemsUsers: Observable<User[]>;

  array: string[]

  users: User[];
  error: string = '';
  date: Date = new Date();
  response: any = {};
  headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private db: AngularFireDatabase,
    public database: Database,
    private translateService: TranslateService
  ) {
    this.loadMoviesPayload();
    this.loadRentsPayload();
    this.loadUserPayload();
  }

  ngOnInit() {
    this.headers = new HttpHeaders().set(
      'Accept-Language',
      this.translateService.currentLang
    );

    

  }
  ngOnChanges() {
    this.headers = new HttpHeaders().set(
      'Accept-Language',
      this.translateService.currentLang
    );
  }

  
  
  loadRentsPayload() {
    // loads rents payload with keys
    this.rentsRef = this.db.list('rents');
    this.itemsRents = this.rentsRef
      ?.snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  loadMoviesPayload() {
    // loads movies payload with keys
    this.moviesRef = this.db.list('movies');
    this.itemsMovies = this.moviesRef
      ?.snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  loadUserPayload() {
    // loads users payload with keys
    this.usersRef = this.db.list('users');
    this.itemsUsers = this.usersRef
      ?.snapshotChanges()
      .pipe(
        map((changes: any[]) =>
          changes.map((c) => ({ key: c.payload.key, ...c.payload.val() }))
        )
      );
  }

  getAvailableMovies() {
   return this.itemsMovies.pipe(
      map(movies => movies.filter(movie => movie.isRented === false))
      )
  }

  getCurrUserRented(email): Observable<string[]> {
    return this.rentsRef.valueChanges().pipe(
      map(rents => rents.filter(rents => rents.userId === email).map(rent => rent.movieId))
    );
  }

  getCurrUserRentedMovies(movieIds) {
    return this.itemsMovies.pipe(
      map(movies => movies.filter(movie => movieIds.includes(movie.key))),
    );
  }

  getUsers(): Observable<User[]> {
    return this.itemsUsers;
  }

  getRentedMovies() {
    // filter by isRented = true
    return this.itemsMovies
      .pipe(map((movies) => movies.filter((movie) => movie.isRented === true)));
  }

  getUnrentedMovies() {
    // filter by isRented = false
    return this.itemsMovies
      .pipe(
        map((movies) => movies.filter((movie) => movie.isRented === false))
      );
  }

  getItemsByType(type: string) {
    // filter item by type
    return this.moviesRef
      .valueChanges()
      .pipe(map((movies) => movies.filter((movie) => movie.Type == type)));
  }

  getMovies() {
    // Returns full movie list
    return this.itemsMovies;
  }


  getDate() {
    this.date = new Date();
     return this.date.toISOString().substr(0,10);
  }

  getRents(): Observable<Rent[]> {
    // get all rents
    return this.itemsRents;
  }
  
  getRentsByUser(user: string){
    return this.itemsRents
      .pipe(map((rents) => rents.filter((rent) => rent.userId === user)));
  }

  getRentLocation(user: string, movieId: string): Observable<string[]>{
    return this.itemsRents.pipe(
      map((rents) => rents.filter((rent) => rent.userId === user && rent.movieId === movieId).map((rent) => rent.key))
    );
  }

  deleteMovie(key: string) {
    // delete movie from database
    this.moviesRef.remove(key);
  }

  pushMovie(movies: Movie) {
    // push movie to database
    this.moviesRef.push({
      Title: movies.Title,
      Poster: movies.Poster,
      Type: movies.Type,
      Year: movies.Year,
      imdbID: movies.imdbID,
      isRented: false,
    });
  }

  pushMovieRents(movies: Movie, user: string, key: string) {
    // push rent to database
    this.rentsRef.push({
      movieId: key,
      userId: user,
      date: this.date.toISOString().substr(0,10),
    });
    update(ref(this.database, 'movies/' + key), {
      isRented: true,
    });
  }

  returnMovie(key: string, id: string) {
    // return movie from rent list
    this.rentsRef.remove(id);
    update(ref(this.database, 'movies/' + key), {
      isRented: false,
    });
  }

  loadUsers(): Observable<User[]> {
    const url = environment.databaseUsers;
    return this.http.get<User[]>(url);
  }

  loadMoviesDetails(id: string) {
    // movie load function based on ID
    const url = environment.apiBase + id + environment.omdb_api_key;
    return this.http.get<Detail>(url);
  }

  searchByKeyword(title: string) {
    // youtube search api
    const url = 'https://www.googleapis.com/youtube/v3/search';
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('q', title)
      .set('maxResults', 1)
      .set('key', environment.youtube_api_key ?? 'error ');
    const options = { params: urlParams };
    return this.http.get<any>(url, options);
  }

  adminLoadMovies(search: string) {
    // admin search api
    const url = environment.apiSearchBase + search + environment.omdb_api_key;
    return this.http.get<any>(url);
  }
}
