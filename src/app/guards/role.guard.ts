import { Injectable, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Users } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { AuthentificationService } from '../services/authentification.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root',

})
export class RoleGuard implements CanActivate {
  admin: boolean = false
  user?= this.authService.auth.currentUser;
  users: Users[] = []
  constructor(public auth: Auth, private post: PostService, private api: ApiService,
    private authService: AuthentificationService, private us: UserService, private router: Router) {


  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean>{
     if(this.post.Role==true){

      return true;
     }else{
      return false;
     }
  
  }
  // chekckUserAccess() {
  //   return this.api.loadUsers().pipe(
  //     map((result: Users[]) => {
  //       if (result.find(u => u.role === "admin")) {
  //          console.log("admin")
  //         return true
  //       } else {
  //         console.log("user")
  //         this.router.navigateByUrl('/home')
  //         return false

  //       }
  //     })
  //   );

  // }
}



