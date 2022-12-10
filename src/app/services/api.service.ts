import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { filter, map, Observable } from 'rxjs';
import { Database, object, ref, update } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList, AngularFireObject, } from '@angular/fire/compat/database';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  moviesRef: AngularFireList<Movie>;
  rentsRef: AngularFireList<Movie>;
  movieRef: AngularFireObject<any>;
  itemsRents: Observable<Movie[]>;
  itemsMovies: Observable<Movie[]>;
  users: User[]
  error: string = "";
  date:Date = new Date();
  response: any = {}


  constructor(private http: HttpClient, private db: AngularFireDatabase, public database: Database) {
    this.moviesRef = db.list('movies');
    this.rentsRef = db.list('rents');
    /////Rents payload key
    this.itemsRents = this.rentsRef?.snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    /////Movies payload key
    this.itemsMovies = this.moviesRef?.snapshotChanges().pipe(
      map((changes: any[]) =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getRentedMovies() { // filter by isRented = true
    return this.moviesRef.valueChanges().pipe(
      map(movies => movies.filter(movie => movie.isRented === true))
    );
  }

  getUnrentedMovies() { // filter by isRented = false
    return this.moviesRef.valueChanges().pipe(
      map(movies => movies.filter(movie => movie.isRented === false))
    );
  }

  getItemsByType(type: string){ // filter item by type
    return this.moviesRef.valueChanges().pipe(
      map(movies => movies.filter(movie => movie.Type == type)))
  }

  getMovies(){ // Returns full movie list
    return this.itemsMovies;
  }
  
  getDate(){
    this.date=new Date();
    // return this.date.toISOString().substr(0,10);
  }

  getRents(): Observable<Movie[]> { // get all rents
    return this.itemsRents;
  }

  deleteMovie(id: string) { // delete movie from database
    this.moviesRef.remove(id);
  }

  pushMovie(movies: Movie) { // push movie to database
    this.moviesRef.push({
      Title: movies.Title,
      Poster: movies.Poster,
      Type: movies.Type,
      Year: movies.Year,
      imdbID: movies.imdbID,
      isRented: false
    });
  }

  pushMovieRents(movies: Movie, user: string, key: string) { // push rent to database
    this.rentsRef.push({
      Title: movies.Title,
      Poster: movies.Poster,
      Type: movies.Type,
      Year: movies.Year,
      imdbID: movies.imdbID,
      user: user,
      // date: this.date.toISOString().substr(0,10),
      id: key
    });
    update(ref(this.database, 'movies/' + key), {
      isRented: true
    });

  }

  returnMovie(key: string, id: string) { // return movie from rent list
    this.rentsRef.remove(key);
    update(ref(this.database, 'movies/' + id), {
      isRented: false
    });
  }
  loadUsers(): Observable<User[]> {
    const url = 'https://angular-filmoteka-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    return this.http.get<User[]>(url);
  }
  loadMoviesDetails(id: string) { // movie load function based on ID
    const url = "http://www.omdbapi.com/?i=" + id + "&apikey=" + environment.omdb_api_key;
    return this.http.get(url)
  }

  searchByKeyword(title: string) { // youtube search api
    const url = "https://www.googleapis.com/youtube/v3/search"
    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('q', title)
      .set('maxResults', 1)
      .set('key', environment.youtube_api_key ?? 'error ')
    const options = { params: urlParams }
    return this.http.get<any>(url, options)
  }

  adminLoadMovies(search: string) { // admin search api
    const url = "https://www.omdbapi.com/?s="+ search +"&apikey=d0e90712";
    return this.http.get<any>(url)
  }



}