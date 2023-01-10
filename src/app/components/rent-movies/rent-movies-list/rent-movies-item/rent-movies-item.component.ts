import { Component, Input, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from 'src/app/models/movie.model';
import { Rent } from 'src/app/models/rents.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-rent-movies-item',
  templateUrl: './rent-movies-item.component.html',
  styleUrls: ['./rent-movies-item.component.css'],
})
export class RentMoviesItemComponent implements OnInit {
  @Input() movie: Movie;

 

  rentsForUser: Rent[]
  rentToDelete: string[]

  rentDeleteKey: string
  movieToDelete: string

  rentsIds: Array<string>
  display: boolean=false;
  details: any=[];
  response: any={};
  isLoaded: boolean;
  error: string;

  constructor(private api: ApiService,  private sanitizer: DomSanitizer,private authService: AuthService,private toastService: HotToastService) {
   
  }

  ngOnInit(): void {
    this.getListWithId()
  }

  getListWithId() {
    this.api.getRentsByUser(this.authService.userEmail).subscribe(data => {
      if (data.length == 0) {
        this.toastService.warning('You have no rented movies')
      }
      else {
        this.rentsForUser = data;
      }
    })
  }

  returnMovie(idMovie) {
    this.api.getRentLocation(this.authService.userEmail,idMovie).subscribe(data => {
      if (data.length == 0) {
  
      }
      else {
        data.forEach(element => {
          this.rentDeleteKey = element.toString();
          this.movieToDelete = idMovie;
        });
        this.returnMovieBack()
      }
    })
  }
  
  returnMovieBack() {
    if (this.rentDeleteKey != undefined){
      this.api.returnMovie(this.movieToDelete , this.rentDeleteKey)
    }
    else {
      this.toastService.success('Error, please try again')
    }
  }

  returnDaysLeft() {
    const isoString = Date.parse(this.movie.date);
    const rentDate = new Date(isoString);
    let now = new Date();
    console.log(now)
    let daysLeft =
      30 -
      Math.trunc((now.getTime() - rentDate.getTime()) / (1000 * 3600 * 24));
    return daysLeft;
  }
  showDialog(movie: Movie) {
    this.api.loadMoviesDetails(movie.imdbID).subscribe(result => {
      this.details = result
    })
    this.searchByKeyword(movie.Title)

  }
  getVideoSource(id: string): SafeResourceUrl { // gets the video source for youtube trailer
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id)
  }
  searchByKeyword(title: string) {
    this.api.searchByKeyword(title).subscribe(
      result => {
        this.response = result;
        this.isLoaded = true;
      },
      err => {
        this.isLoaded = false;
        this.error = err.message;
      }
    );
  }
}
