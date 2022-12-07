import { Component, OnInit } from '@angular/core';
import { Users } from './models/user.model';
import { ApiService } from './services/api.service';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'Filmoteka';
  
  ngOnInit(): void {
   
   }


  
  
}
