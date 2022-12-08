import { Component, Input, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Movie } from 'src/app/models/movies.model';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-list-item',
  templateUrl: './admin-list-item.component.html',
  styleUrls: ['./admin-list-item.component.css']
})
export class AdminListItemComponent implements OnInit {
  @Input() movies: Movie;
  film:any;
  constructor(private post: PostService, private api: ApiService, private toastService: HotToastService) { }

  ngOnInit(): void {
    this.film = this.api.getMovies();
    console.log(this.movies)
  }
  async Push(movies: Movie, imdbID: string) {
    if (true) {
      this.toastService.warning('Film vec postoji u bazi!');
    } else {
      
      this.api.pushMovie(movies)
      this.toastService.success('Uspenso si dodao film u bazu')
    }
  }
}
