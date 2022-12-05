import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movies } from '../../models/movies.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() carouselElement: string;
  movies: Movies[];

  responsiveOptions;

  constructor(private http: HttpClient, private api: ApiService, private movieService: MovieService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];

  }
  ngOnChanges(changes: SimpleChanges): void {

  }

  ngOnInit() {
    this.loadMovies(this.carouselElement);
  }
  loadMovies(key: string) {
    const url = "https://www.omdbapi.com/?s=" + key + "&apikey=d0e90712";
    return this.http.get<Movies[]>(url).
      subscribe((result: any) => {
        this.movies = result.Search
        console.log(result)
      })

  }
}


