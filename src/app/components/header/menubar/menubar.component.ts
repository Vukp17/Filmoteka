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


export class MenubarComponent implements OnInit, OnChanges {
  items: MenuItem[];
  notLoggedInItems: MenuItem[];
  navColor = 'primary';
  isLoggedIn = false;
  userSubscription = null;
  isAdmin = false;
  user = null;
  countries: Country[];
  selectedCountry: Country;
  selectedCountryName: string
  loginClicked = false;
  logoutClicked = false;
  userItems: MenuItem[] = [
    {
      label: "Home",
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home']
    },
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
  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public translate: TranslateService
  ) {
    this.translate.get('navbar.home').subscribe((translation: string) => {
      this.userItems[0].label = translation;
      console.log(translation)
    });
    this.translate.get('navbar.movies').subscribe((translation: string) => {
      this.userItems[1].label = translation;
      console.log(translation)
    });
    this.translate.get('navbar.rent').subscribe((translation: string) => {
      this.userItems[2].label = translation;
      console.log(translation)
    });
  }


  ngOnInit() {
    this.countries = [
      { name: 'EN', code: 'en' },
      { name: 'DE', code: 'de' },
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
        routerLink: ['/admin-db-list'],
      },
      {
        label: 'Analytics',
        icon: 'pi pi-fw pi-chart-line',
        routerLink: ['/admin-analytics'],
      },
    ];

    this.authService.isAdminSubject
      .subscribe(isAdmin => {
        this.isAdmin = isAdmin;
      });

    this.authService.userSubject
      .subscribe(user => {
        this.user = user;
      });
  }
  ngOnChanges() {
    this.authService.isLoggedInSubject
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
  }
  logout(): void {
    this.afAuth.signOut();
    this.authService.resetState();
  }
  setLanguage() {
    if (this.selectedCountry !== undefined) {
      this.translate.use(this.selectedCountry.code);
      const userKeys = ['navbar.home', 'navbar.movies', 'navbar.rent'];
      const userKeysLength = userKeys.length;
      userKeys.forEach((key, index) => {
        this.translate.get(key).subscribe((translation: string) => {
          this.userItems[index].label = translation;
        });
      });
      const itemsKeys = ['navbar.home', 'navbar.addmovies', 'navbar.dataBase', 'navbar.analytics'];
      const itemsKeysLength = itemsKeys.length;
      itemsKeys.forEach((key, index) => {
        this.translate.get(key).subscribe((translation: string) => {
          this.items[index].label = translation;
        });
      });
      
    }
  }
}
