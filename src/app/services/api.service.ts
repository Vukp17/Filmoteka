import { Injectable } from '@angular/core';
import { MovieService } from './movie.service';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Movies } from '../components/movies/movies.model';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { Database, ref, update } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireList, AngularFireObject, } from '@angular/fire/compat/database';
import { Users } from '../components/signup/user.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //AngularFireLists(Observables)
  moviesRef: AngularFireList<Movies>;
  rentsRef: AngularFireList<Movies>;
  movieRef: AngularFireObject<any>;
  itemsRents: Observable<any[]>;
  itemsMovies: Observable<any[]>;
  users: Users[]
  error:string = "";
  response:any = {}
  constructor(private http: HttpClient,private sanitizer:DomSanitizer, private movieService: MovieService, private db: AngularFireDatabase, public database: Database) {
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
  getMovies() {
    return this.itemsMovies;
  }
  getRents() {
    return this.itemsRents;
  }
  deleteMovie(id: string) {
    this.moviesRef.remove(id);
    console.log(id)
  }

  pushMovie(movies: Movies) {
    this.moviesRef.push({
      Title: movies.Title,
      Poster: movies.Poster,
      Type: movies.Type,
      Year: movies.Year,
      imdbID: movies.imdbID,
      isRented: false
    });
  }
  pushMovieRents(movies: Movies, user: string, key: string) {
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
    console.log(id)
    update(ref(this.database, 'movies/' + id), {
      isRented: false
    });
  }

  subjekat = new BehaviorSubject<string>('pocetna vrednos')
  
  subjekat2 = new BehaviorSubject<string>('2')
  changeSubject(value: string) {
    this.subjekat.next(value)
  }

  changeSubject2() {
    this.subjekat.next('PROMENA')
  }


  loadUsers(): Observable<Users[]> {
    const url = 'https://movieapp-4d0c2-default-rtdb.europe-west1.firebasedatabase.app/users.json';
    return this.http.get<Users[]>(url);
  }
  loadMoviesDetails(id: string) {

    const url = "http://www.omdbapi.com/?i=" + id + "&apikey=d0e90712";
    return this.http.get(url)


  }

}