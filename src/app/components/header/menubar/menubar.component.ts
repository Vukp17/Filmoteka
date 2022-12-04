import { Component, OnInit } from '@angular/core';
//Prime
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { MegaMenuItem } from 'primeng/api'
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent implements OnInit {
  userName?: any;
  user$ = this.authService.currentUser$;
  constructor(private authService: AuthentificationService, private router: Router, private api: ApiService) {
    this.userName = this.authService.auth.currentUser?.displayName
   }

  items: MenuItem[];


  ngOnInit() {

    console.log(this.userName)
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home', routerLink: ['/home']  },
      { label: 'Your Movies', icon: 'pi pi-fw pi-video', routerLink: ['/movies'] },
      {
        label: this.userName, icon: 'pi pi-fw pi-user',
        items: [
          {
            label: 'Admin',
            icon: 'pi pi-fw pi-align-left',
            routerLink: ['/admin']

          }
        ]
      },
      { label: 'Rents', icon: 'pi-shopping-cart', routerLink: ['/rent'] },
    ];  
  }

  Logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
      
    });;
  }
}