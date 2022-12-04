import { HttpClient, HttpParams } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HotToastService } from '@ngneat/hot-toast';
import { ApiService } from 'src/app/services/api.service';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { PostService } from 'src/app/services/post.service';
import { Movies } from '../../movies.model';
@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.css']
})
export class MovieItemComponent implements OnInit {
  @Input() movies: Movies;
  @Output() moviesSelected = new EventEmitter<void>();
  email: string | any;
  details: any = []
  display: boolean = false;

  error: string = "";
  response: any = {}

  constructor(public api: ApiService, private authService: AuthentificationService,
    private post: PostService, private toastService: HotToastService, private sanitizer: DomSanitizer, private http: HttpClient) {
    this.email = this?.authService?.auth?.currentUser?.email;
  }


  ngOnInit(): void {
   

  }
  onSelected() {
    this.moviesSelected.emit();
  }
  Remove(key: any) {
    this.api.deleteMovie(key)
    this.toastService.success('Uspenso izbrisan iz baze')

  }
  Rent(movies: Movies, key: any) {
    this.api.pushMovieRents(movies, this.email, key)
  }

  showDialog(id: string) {
    this.api.loadMoviesDetails(id).subscribe(result => {
      this.display = true;
      this.details = result
    })

  }
  // serachYoutube(title: string) {
  //   this.api.searchByKeyword(title)
  // }
  // getVideo(id: string) {
  //   this.api.getVideoSource(id)
  // }


  searchByKeyword(title: string) {
    const url = "https://www.googleapis.com/youtube/v3/search"

    const urlParams = new HttpParams()
      .set('part','snippet')
      .set('q', title)
      .set('maxResults', 1)
      .set('key', 'AIzaSyAzaSAkDKh7ZYw7jd98E9a0y4Bdv2bWVKQ')
    const options = { params: urlParams }

    this.http.get<any>(url, options).subscribe(result => {

      this.response = result
    })
    console.log(this.response)
  }




  

  getVideoSource(id:string): SafeResourceUrl {
      return this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+id)
   
    
  }
}

