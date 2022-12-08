import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HotToastService } from '@ngneat/hot-toast';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-admin-databse-list-item',
  templateUrl: './admin-databse-list-item.component.html',
  styleUrls: ['./admin-databse-list-item.component.css']
})
export class AdminDatabseListItemComponent implements OnInit {
  @Input() movies: Movie;
  constructor(public api: ApiService, private toastService: HotToastService,) {

  }

  ngOnInit(): void {

  }

  Remove(key: any, isRented: boolean | undefined): void {
    if (isRented == true) {
      this.toastService.warning("Film jer rentovan ne moze se obrisati iz baze")
    } else {
      this.api.deleteMovie(key)
      this.toastService.success('Uspenso izbrisan iz baze')
    }

  }
}
