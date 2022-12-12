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
  selectedMovie:Movie
  moviesMessage: string;
  typeMessage: string;

  details: any = [] // youtube details
  display: boolean ;
  ////Api
  error: string = "";
  response: any = {}
  responsiveOptions: any;

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
      if (data.length == 0) {
        this.typeMessage = 'You cannot load this type of our items because it is not available'
      }
      else {
        this.movies = data
      }
    })
  }

  loadMoviesDatabase() { // loads all movies from database
    this.api.getMovies().subscribe(data => {
      if (data.length == 0) {
        this.moviesMessage = 'There is no movies available at the moment'
      }
      else {
        this.movies = data
      }
    })
  }

  showDialog(movie: Movie) { // opens movie details with modal
     this.display= true
     this.selectedMovie=movie
     console.log(this.selectedMovie)
  }

  searchByKeyword(title: string) { // searches for youtube video with keyword
    this.api.searchByKeyword(title).subscribe(result => {
      if (result.length == 0) {
        console.log('Search by keywoard returns null')
      }
      else {
        this.response = result
      }
    })
  }
  getVideoSource(id: string): SafeResourceUrl { // gets the video source for youtube trailer
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id)
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



