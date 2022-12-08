import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Movie } from '../models/movie.model';
import { map, Observable } from 'rxjs';
import { Database, ref, update } from '@angular/fire/database';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireList, AngularFireObject, } from '@angular/fire/compat/database';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //AngularFireLists(Observables)

  moviesRef: AngularFireList<Movie>;
  rentsRef: AngularFireList<Movie>;
  movieRef: AngularFireObject<any>;
  itemsRents: Observable<Movie[]>;
  itemsMovies: Observable<Movie[]>;
  users: User[]
  error: string = "";
  response: any = {}


  constructor(private http: HttpClient, private db: AngularFireDatabase, public database: Database) {
    this.moviesRef = db.list('movies');
    this.rentsRef = db.list('rents')
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


  getMovies(){
    return this.itemsMovies;
  }

  getRents() {
    return this.itemsRents;
  }

  deleteMovie(id: string) {
    this.moviesRef.remove(id);
  }

  pushMovie(movies: Movie) {
    this.moviesRef.push({
      Title: movies.Title,
      Poster: movies.Poster,
      Type: movies.Type,
      Year: movies.Year,
      imdbID: movies.imdbID,
      isRented: false
    });
  }
  pushMovieRents(movies: Movie, user: string, key: string) {
    this.rentsRef.push({
      Title: movies.Title,
      Poster: movies.Poster,
      Type: movies.Type,
      Year: movies.Year,
      imdbID: movies.imdbID,
      user: user,
      id: key
    });
    update(ref(this.database, 'movies/' + key), {
      isRented: true
    });

  }

  returnMovie(key: string, id: string) {
    this.rentsRef.remove(key);
    update(ref(this.database, 'movies/' + id), {
      isRented: false
    });
  }
  loadUsers(): Observable<User[]> {
    const url = 'https://movieapp-4d0c2-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    return this.http.get<User[]>(url);
  }
  loadMoviesDetails(id: string) {
    const url = "http://www.omdbapi.com/?i=" + id + "&apikey=" + environment.omdb_api_key;
    return this.http.get(url)
  }

  searchByKeyword(title: string) {
    const url = "https://www.googleapis.com/youtube/v3/search"

    const urlParams = new HttpParams()
      .set('part', 'snippet')
      .set('q', title)
      .set('maxResults', 1)
      .set('key', environment.youtube_api_key ?? 'error ')
    const options = { params: urlParams }

    return this.http.get<any>(url, options)

  }


  adminLoadMovies(search: string) {
    const url = "https://www.omdbapi.com/?s="+ search +"&apikey=d0e90712";
    return this.http.get<any>(url)
  }



}