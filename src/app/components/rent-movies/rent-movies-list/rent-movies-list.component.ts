import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-rent-movies-list',
  templateUrl: './rent-movies-list.component.html',
  styleUrls: ['./rent-movies-list.component.css']
})
export class RentMoviesListComponent implements OnInit {
  movies:any;
  
  constructor(private api:ApiService,private authService:AuthService) { }

  ngOnInit(): void {
    this.Ucitaj()
  }
  Ucitaj(){
    this.movies = this.api.getRents();
    console.log(this.movies)
  }
}
