import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-rent-movies-list',
  templateUrl: './rent-movies-list.component.html',
  styleUrls: ['./rent-movies-list.component.css']
})
export class RentMoviesListComponent implements OnInit {
  movies:any;
  user$ = this.authService.currentUser$;
  constructor(private api:ApiService,private authService:AuthentificationService) { }

  ngOnInit(): void {
    this.Ucitaj()
  }
  Ucitaj(){
    this.movies = this.api.getRents();
    console.log(this.movies)
  }
}
