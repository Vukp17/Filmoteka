import { Component, OnInit } from '@angular/core';
//Prime
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { PostService } from 'src/app/services/post.service';
import { User } from '../../../models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { Subscription } from 'rxjs';
import { IdTokenResult } from '@angular/fire/auth';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})
export class MenubarComponent implements OnInit {

  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private userService: UserService
  ) { }
  
  items: MenuItem[];
  userItems: MenuItem[];
  notLoggedInItems: MenuItem[];
  navColor = 'primary';
  isLoggedIn = false;
  userSubscription = null;
  isAdmin = false;
  user = null;

  loginClicked = false;
  logoutClicked = false;

  ngOnInit() {
 
   this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      {
        label: 'Add movies',
        icon: 'pi pi-fw pi-video',
        routerLink: ['/admin'],
      },
      {
        label: 'DataBase',
        icon: 'pi pi-fw pi-database',
        routerLink: ['/admin-list'],
      },
    ];
    this.userItems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      {
        label: 'Movies',
        icon: 'pi pi-fw pi-video',
        routerLink: ['/movies'],
      },
      {
        label: 'Rent',
        icon: 'pi pi-fw pi-shopping-cart',
        routerLink: ['/rent'],
      },
    ];
 

    this.authService.isLoggedInSubject
    .subscribe( isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  
  this.authService.isAdminSubject
    .subscribe( isAdmin => {
      this.isAdmin = isAdmin;
    });
  
  this.authService.userSubject
    .subscribe( user => {
      this.user = user;
    });

 
  }

  logout(): void {
    this.afAuth.signOut();
    this.authService.resetState();
  }
}
