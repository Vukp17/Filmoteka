import { Component, OnInit } from '@angular/core';
import { User } from './models/user.model';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  
  title = 'Filmoteka';
  constructor(private authService:AuthService){

  }
  ngOnInit(): void {
    this.authService.autoLogin();
   }


  
  
}
