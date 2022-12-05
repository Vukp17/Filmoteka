import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movies } from '../../../models/movies.model';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {
  movies: Movies[];
  inputValue: string;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
 
  }
  loadMovies() {
    const url = "https://www.omdbapi.com/?s="+this.inputValue+"&apikey=d0e90712";
    return this.http.get<Movies[]>(url).
      subscribe((result: any) => {
        this.movies = result.Search
        console.log(this.movies)
      })

  }
  
  onKey(event: any) { this.inputValue = event.target.value; }
}
