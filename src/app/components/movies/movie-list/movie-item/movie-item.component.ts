import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
///Services
import { HotToastService } from '@ngneat/hot-toast';
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
  @Input() movies: Movie;
  @Output() moviesSelected = new EventEmitter<void>();
  email: string | any;
  details: any = []
  display: boolean = false;
  ////Api
  error: string = "";
  response: any = {}

  constructor(public api: ApiService, public authService: AuthService,
    private toastService: HotToastService,private userService: UserService,
    private sanitizer: DomSanitizer) {
    this.authService.getCurrentUserEmail()

  }


  ngOnInit(): void {


  }
  onSelected() {
    this.moviesSelected.emit();
  }
  Remove(key: any) {
    this.api.deleteMovie(key)
    this.toastService.success('Uspenso izbrisan iz baze')

  }
  Rent(movies: Movie, key: any) {
    this.api.pushMovieRents(movies, this.userService.Email, key)
  }

  showDialog(id: string) {
    this.api.loadMoviesDetails(id).subscribe(result => {
      this.display = true;
      this.details = result
      console
    })

  }
  searchByKeyword(title: string) {
    this.api.searchByKeyword(title).subscribe(result => {
      this.response = result
    })
  }
  getVideoSource(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id)
  }
}

