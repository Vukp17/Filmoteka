import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import { Observable } from 'rxjs';
import { Movie } from '../models/movies.model';
import { ApiService } from './api.service';
import { MovieService } from './movie.service';
@Injectable({
  providedIn: 'root'
})
export class MovieResloverService implements Resolve<Movie[]>{
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Movie[] | Observable<Movie[]> | Promise<Movie[]> {
    throw new Error('Method not implemented.');
  }

/*onstructor(private api: ApiService,private  movieService:MovieService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Movies[] | Observable<Movies[]> | Promise<Movies[]> {
    const movies = this.movieService.getMovies();
    if(movies?.length === 0){
      return this.api.loadMovies();
    }
    return movies;
  }
}

*/
}