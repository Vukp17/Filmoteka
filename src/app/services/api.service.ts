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
@Injectable({
  providedIn: 'root',
})
export class ApiService implements OnInit, OnChanges {
  moviesRef: AngularFireList<Movie>;
  rentsRef: AngularFireList<Movie>;
  movieRef: AngularFireObject<any>;
  usersRef: AngularFireList<Movie>;

  itemsRents: Observable<Movie[]>;
  itemsMovies: Observable<Movie[]>;
  itemsUsers: Observable<User[]>;

<<<<<<< Updated upstream
  availableMovies: Observable<Movie[]>

  users: User[]
  error: string = "";
=======
  users: User[];
  error: string = '';
>>>>>>> Stashed changes
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

  // getCurrUserRented(email) {
  //   return this.rentsRef.valueChanges().pipe(
  //     map(movies => movies.filter(rents => rents.email === email))
  //   );
  // }

  getUsers(): Observable<User[]> {
    return this.itemsUsers;
  }

  getRentedMovies() {
    // filter by isRented = true
    return this.moviesRef
      .valueChanges()
      .pipe(map((movies) => movies.filter((movie) => movie.isRented === true)));
  }

  getUnrentedMovies() {
    // filter by isRented = false
    return this.moviesRef
      .valueChanges()
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

  getRents(): Observable<Movie[]> {
    // get all rents
    return this.itemsRents;
  }
  getRentsByUser(user: string): Observable<Movie[]> {
    console.log(user);
    // get rents by user
    return this.rentsRef
      .valueChanges()
      .pipe(map((rents) => rents.filter((rent) => rent.user === user)));
  }

  deleteMovie(id: string) {
    // delete movie from database
    this.moviesRef.remove(id);
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
      Title: movies.Title,
      Poster: movies.Poster,
      Type: movies.Type,
      Year: movies.Year,
      imdbID: movies.imdbID,
      user: user,
      date: this.date.toISOString().substr(0,10),
      id: key,
    });
    update(ref(this.database, 'movies/' + key), {
      isRented: true,
    });
  }

  returnMovie(key: string, id: string) {
    // return movie from rent list
    this.rentsRef.remove(key);
    update(ref(this.database, 'movies/' + id), {
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
    return this.http.get(url);
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
