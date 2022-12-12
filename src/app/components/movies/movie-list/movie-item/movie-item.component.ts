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
  email: string | any;
  details: any = []
  display: boolean = false;
  show = false;
  ////Api
  error: string = "";
  response: any = {}
  isLoaded: boolean;

  constructor(public api: ApiService, public authService: AuthService,
    private toastService: HotToastService, private userService: UserService,
    private sanitizer: DomSanitizer) {
    this.authService.getCurrentUserEmail()

  }

  ngOnInit(): void {
    this.authService.getCurrentUserEmail();

  }

  onSelected() {
    this.moviesSelected.emit();
  }

  remove(key: any) {
    this.api.deleteMovie(key)
    this.toastService.success('Successefully deleted from database')
  }

  rent(movies: Movie, key: any) {
    this.api.pushMovieRents(movies, this.userService.email, key)
  }

  showDialog(movieTitle: string) {
    this.display = true;
    this.searchByKeyword(movieTitle)
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

