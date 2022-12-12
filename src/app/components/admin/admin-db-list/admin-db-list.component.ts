import { Component, OnInit } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin-db-list',
  templateUrl: './admin-db-list.component.html',
  styleUrls: ['./admin-db-list.component.css']
})
export class AdminDbListComponent implements OnInit {

  movies:Movie[];
  rentedMovies: Movie[];
  unrentedMovies: Movie[];
  rentedMessage: string;
  unrentedMessage: string;

  constructor(private api:ApiService,private toast: HotToastService) { }

  ngOnInit(): void {
    
    this.loadRentedMovies();
    this.loadUnrentedMovies();
  }

  ngOnChanges(){
    
  }

  loadRentedMovies() {
   this.api.getRentedMovies()
   .pipe(
    this.toast.observe({
      success: 'Loaded',
      loading: 'Loading ...',
    })
  )
   .subscribe(data =>{
    if (data.length == 0) {
      this.unrentedMessage = 'All movies are currently rented'
    }
    else {
      this.rentedMovies = data;
    }
   })
  }

  loadUnrentedMovies() {
    this.api.getUnrentedMovies().subscribe(data => {
      if (data.length == 0) {
        this.rentedMessage = 'There is no rented movies at the moment'
      }
      else {
        this.unrentedMovies = data;
      }
    })
  }
 
 
}
