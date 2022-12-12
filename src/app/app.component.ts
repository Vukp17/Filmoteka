import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
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
  constructor(private authService:AuthService,private translate: TranslateService){
   
      translate.setDefaultLang('en');
      translate.addLangs(['en','de']);
    
  }
  ngOnInit(): void {
    this.authService.autoLogin();
    this.authService.getCurrentUserEmail();
   }

}
