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
  @Input() response: any = {}
  error :string = ''
  isLoaded: boolean;
  constructor(private api: ApiService, private sanitizer: DomSanitizer) { }


  ngOnInit(): void {
          this.showDialog(this.movie.imdbID)
    
  }
  showDialog(id: string) {
    this.api.loadMoviesDetails(id).subscribe(result => {
      this.details = result
      console
    })
  }


  getVideoSource(id: string): SafeResourceUrl {
    console.log(id)
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id)
  }
}
