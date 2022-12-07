import { Injectable, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';


@Injectable({
  providedIn: 'root',

})
export class RoleGuard implements CanActivate {
 

  constructor(public auth: Auth, private post: PostService, private api: ApiService, private us: UserService, private router: Router) {


  }

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean>{
     if(true){

      return true;
     }
  
  }

}



