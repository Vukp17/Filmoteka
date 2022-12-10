import { Component, OnChanges, OnInit } from '@angular/core';
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
import { TranslateService } from '@ngx-translate/core';

interface Country {
  name: string,
  code: string
}
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css'],
})


export class MenubarComponent implements OnInit, OnChanges{
  items: MenuItem[];
  userItems: MenuItem[];
  notLoggedInItems: MenuItem[];
  navColor = 'primary';
  isLoggedIn = false;
  userSubscription = null;
  isAdmin = false;
  user = null;
  countries: Country[];

  selectedCountryCode: Country;

  loginClicked = false;
  logoutClicked = false;

  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    private userService: UserService,
    private translate: TranslateService
  ) {

   }


  ngOnInit() {
    console.log(this.selectedCountryCode)
    this.countries = [
      {name: 'Englis', code: 'en'},
      {name: 'Deutch', code: 'de'},
  ];
   this.items = [
      { label: "Home", icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
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
      { 
      label: "('navbar.home' | translate)",
      icon: 'pi pi-fw pi-home', 
      routerLink: ['/home'] },
      { 
        label: this.translate.instant('navbar.login '),
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
  ngOnChanges(){
    console.log(this.selectedCountryCode)
  }
  logout(): void {
    this.afAuth.signOut();
    this.authService.resetState();
  }
  setLanguage(){
    this.translate.use(this.selectedCountryCode.code);
    console.log(this.selectedCountryCode.code)
  }
}
