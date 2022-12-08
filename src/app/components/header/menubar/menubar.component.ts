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
  userSub: Subscription;
  items: MenuItem[];
  nonUserItems: MenuItem[];
  user: User;
  isAdmin: boolean | undefined = false;

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((data) => {
      console.log(!!data);
      console.log(data?.admin);
      this.isAdmin = data?.admin;
    })
    this.nonUserItems = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/landing'] },
    ];
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home'] },
      {
        label: 'Add movie',
        icon: 'pi pi-fw pi-video',
        routerLink: ['/admin'],
      },
      {
        label: 'DataBase',
        icon: 'pi pi-fw pi-database',
        routerLink: ['/admin-list'],
      },
    ];
  }
  logout(): void {
    this.afAuth.signOut();
  }
}
