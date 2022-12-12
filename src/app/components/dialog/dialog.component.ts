import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from 'src/app/models/movie.model';
import { Detail } from 'src/app/models/movieById.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit,OnChanges {
  details: Detail
  @Input() display: boolean=false
  @Input() movie: Movie
  @Input() response: any = {}
  dialogDisplay:boolean = false
  error: string = ''
  isLoaded: boolean;
  constructor(private api: ApiService, private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['display'] && changes['display'].currentValue) {
      this.showDialog(this.movie.imdbID);
    }
  }
  ngOnInit(): void {

  }
  showDialog(id: string) {
    this.api.loadMoviesDetails(id).subscribe(result => {
      this.details = result
    
    })
  }


  getVideoSource(id: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/" + id)
  }
}
