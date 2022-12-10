import { HttpClient } from '@angular/common/http';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from '../../models/movie.model';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, OnChanges {
  @Input() carouselElement: string;
  movies: Movie[];



  responsiveOptions;
  message: string;

  constructor(private http: HttpClient, private api: ApiService, private movieService: MovieService) {
    this.movies=[]
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
    if(this.carouselElement==undefined){
      this.loadMoviesDatabase()
    }else{
     
      this.fetchMoviesbyType(this.carouselElement)
    }
 
  }
  loadMoviesDatabase(){
    this.api.getMovies().subscribe(data =>{
      this.movies = data
    })
  }

 async fetchMoviesbyType(key: string){
    this.api.getMovies().subscribe(data =>{
      for(let item of data){
      if (item.Type==key) {
        this.movies.push(item);
      }else{
       
        console.log("tip je serija")
      }
      
    }
    console.log(this.movies)
    });
  }
}


