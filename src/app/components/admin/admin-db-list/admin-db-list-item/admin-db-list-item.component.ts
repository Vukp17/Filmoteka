import { Component, Input, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-admin-db-list-item',
  templateUrl: './admin-db-list-item.component.html',
  styleUrls: ['./admin-db-list-item.component.css']
})
export class AdminDbListItemComponent implements OnInit {
  @Input() movie: Movie;
  display: boolean = false;

  constructor(public api: ApiService, private toastService: HotToastService,) {

  }

  ngOnInit(): void {

  }

  remove(key: any, isRented: boolean | undefined): void {
    if (isRented == true) {
      this.toastService.warning("Movie is already rented and cannot be deleted from database");
    } else {
      console.log(' tu sam key log ' + key)
      this.api.deleteMovie(key)
      this.toastService.success('Successefully deleted movie from database');
    }

  }
  showDialog() {
    this.display = true;
  }

}