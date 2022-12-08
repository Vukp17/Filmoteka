import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
@Input() imdbID: string

details: any = []
display: boolean = false;
////Api
error: string = "";
response: any = {}
  constructor(private api: ApiService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }
  onMovieSelected(){

  }
  showDialog(id: string) {
    this.api.loadMoviesDetails(this.imdbID).subscribe(result => {
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
