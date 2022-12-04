import { Component, Input, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Movies } from 'src/app/components/movies/movies.model';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-list-item',
  templateUrl: './admin-list-item.component.html',
  styleUrls: ['./admin-list-item.component.css']
})
export class AdminListItemComponent implements OnInit {
  @Input() movies: Movies;
  film:any;
  constructor(private post: PostService, private api: ApiService, private toastService: HotToastService) { }

  ngOnInit(): void {
    this.film = this.api.getMovies();
    console.log(this.movies)
  }
  async Push(movies: Movies, imdbID: string) {
    if (await this.post.chekcMovie(imdbID, this.film)) {
      this.toastService.warning('Film vec postoji u bazi!');
    } else {
      
      this.api.pushMovie(movies)
      this.toastService.success('Uspenso si dodao film u bazu')
    }
  }
}
