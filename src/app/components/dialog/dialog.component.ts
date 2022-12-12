import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from 'src/app/models/movie.model';
import { Detail } from 'src/app/models/movieById.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  details: Detail
  @Input() display: boolean;
  @Input() movie: Movie
  response: any = {}
  error :string = ''
  isLoaded: boolean;
  constructor(private api: ApiService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
    if (this.movie != undefined) {
      this.showDialog(this.movie.imdbID)
      this.searchByKeyword(this.movie.Title)
    }
  }
  showDialog(id: string) {
    this.api.loadMoviesDetails(id).subscribe(result => {
      this.details = result
      console
    })
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
  getVideoSource(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id)
  }
}
