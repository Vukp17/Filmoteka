import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
///Services
import { HotToastService } from '@ngneat/hot-toast';
import { now } from 'lodash';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { Movie } from '../../../../models/movie.model';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})

export class MovieItemComponent implements OnInit {
  @Input() movie: Movie;
  @Output() moviesSelected = new EventEmitter<void>();
  @Output() onClose = new EventEmitter<boolean>();
  email: string | any;
  details: any = []
  display: boolean = false;
  visible: boolean=false;
  ////Api
  error: string = "";
  response: any = {}
  isLoaded: boolean;
  selectedMovie:Movie;


  constructor(public api: ApiService, public authService: AuthService,
    private toastService: HotToastService, private userService: UserService,
    private sanitizer: DomSanitizer) {
    

  }

  ngOnInit(): void {


  }

  onSelected() {
    this.moviesSelected.emit();
  }

  remove(key: any) {
    this.api.deleteMovie(key)
    this.toastService.success('Successefully deleted from database')
  }

  rent(movies: Movie, key: any) {
    this.api.pushMovieRents(movies, this.authService.userEmail, key)
  }
  getVideoSource(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id)
  }
  showDialog(movie: Movie) {
    this.api.loadMoviesDetails(movie.imdbID).subscribe(result => {
      this.details = result
    })
    this.searchByKeyword(movie.Title)
    this.selectedMovie=movie
    this.visible = true;
    this.display = true;
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

