import { Injectable, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  isAdmin: boolean = false;

  constructor(
    public auth: Auth,
    private post: PostService,
    private api: ApiService,
    private us: UserService,
    private router: Router,
    private authService: AuthService
  ) {
    this.authService.isAdminSubject
    .subscribe( isAdmin => {
      this.isAdmin = isAdmin;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean> {
   // console.log(this.isAdmin)
    if ( this.authService.hasClaim('admin')) {
      return true;
    } else {
      
      this.router.navigate(['/access-denied']);
      return false;
    }
  }
}
