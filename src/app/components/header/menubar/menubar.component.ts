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
import { MytranslateService } from 'src/app/services/mytranslate.service';

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
  userItems: MenuItem[];
  notLoggedInItems: MenuItem[];
  navColor = 'primary';
  //check is user or admin
  isLoggedIn:boolean = false;
  userSubscription: Subscription = null;
  isAdmin: boolean = false;
  user;
  //cascadeselect
  countries: Country[];
  selectedCountry: Country;
  selectedCountryName: string
  //login
  loginClicked = false;
  logoutClicked = false;
  constructor(
    public afAuth: AngularFireAuth,
    public authService: AuthService,
    public translate: TranslateService,
    private mytranslate: MytranslateService,
    private router: Router
  ) {
  }
  //lifecycle
  ngOnChanges() {
    this.authService.isLoggedInSubject
      .subscribe(isLoggedIn => {
        this.isLoggedIn = isLoggedIn;
      });
  }
  ngOnInit() {

    this.countries = [
      { name: 'EN', code: 'en' },
      { name: 'DE', code: 'de' },
    ];

    this.userItems = [
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
  
  //logut
  logout(): void {
    this.afAuth.signOut();
    this.authService.resetState();
    this.router.navigate(['/auth'])
  }

  //set language 
  setLanguage() {
    this.mytranslate.setLanguage(this.selectedCountry, this.userItems, this.items)
  }
}
