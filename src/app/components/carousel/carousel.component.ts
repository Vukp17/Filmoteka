import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],

})
export class CarouselComponent implements OnInit, OnChanges {

  @Input() carouselElement: string;

  movies: Movie[];
  moviesType: string = 'movies';
  seriesType: string = 'series';

  details: any = []
  display: boolean = false;
  ////Api
  error: string = "";
  response: any = {}
  responsiveOptions: any;
  show = false;

  constructor(private sanitizer: DomSanitizer, private api: ApiService, private movieService: MovieService) {

    this.movies = []
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
    this.fillCorousel()

  }

  loadByType(element: string) { // load movies by type
    this.api.getItemsByType(element).subscribe(data => {
      this.movies = data
      // console.log(this.movies)
    })
  }

  loadMoviesDatabase() { // loads all movies from database
    this.api.getMovies().subscribe(data => {
      this.movies = data
    })
  }

  showDialog(id: string) { // opens movie details with modal
    this.api.loadMoviesDetails(id).subscribe(result => {
      this.show = true;
      this.details = result
    })
  }

  searchByKeyword(title: string) { // searches for youtube video with keyword
    this.api.searchByKeyword(title).subscribe(result => {
      this.response = result
    })
  }


  fillCorousel() { // fills the corousel 
    if (this.carouselElement == undefined) {
      this.loadMoviesDatabase()
    }
    else {
      this.loadByType(this.carouselElement)
    }
  }

}



