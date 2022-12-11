import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Movie } from 'src/app/models/movie.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  @Input()details: any = []
  @Input()display: boolean;
  @Input()response: any = {}
  @Input() Rent: Function;
    constructor(private api: ApiService,private sanitizer: DomSanitizer) { }
  
    ngOnInit(): void {
    }
    showDialog(id: string) {
      this.api.loadMoviesDetails(id).subscribe(result => {
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
