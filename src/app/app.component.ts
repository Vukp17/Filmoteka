import { Component, OnInit } from '@angular/core';
import { Users } from './models/user.model';
import { ApiService } from './services/api.service';
import { AuthentificationService } from './services/authentification.service';
import { PostService } from './services/post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  users: Users[];
  user?= this.authService.auth.currentUser;
  user$ = this.authService.currentUser$;
  constructor(private post:PostService,private api:ApiService,private authService:AuthentificationService){
    console.log(this.user?.email)
  }
  ngOnInit(): void {
   this.api.loadUsers().subscribe((result: Users[]) => {
    const values = Object.values(result);
    this.users = values;
    this.Proveri(values)
    console.log("ODradio je") 
   })


  }
  Proveri(users: Users[]){
    
    for(let i = 0; i < users.length; i++){
      if (this.user?.email == users[i].email && users[i].role == "admin") {
        this.post.Role=true
        console.log("this.users[i].email")
      }
    }
    console.log(this.user?.email)
  }
  title = 'Filmoteka';
}
