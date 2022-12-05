import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movies } from '../../models/movies.model';


@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  providers: [MovieService,ApiService]
})
export class MoviesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    

  }

}
