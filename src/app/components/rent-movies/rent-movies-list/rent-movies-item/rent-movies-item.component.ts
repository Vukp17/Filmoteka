import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movies.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rent-movies-item',
  templateUrl: './rent-movies-item.component.html',
  styleUrls: ['./rent-movies-item.component.css']
})
export class RentMoviesItemComponent implements OnInit {
  @Input() movies: Movie;
  constructor(private api:ApiService) { }

  ngOnInit(): void {
  }
  Return(key: any,id: any){
    this.api.returnMovie(key,id)
  }
}
