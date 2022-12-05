import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { PostService } from 'src/app/services/post.service';
import { filter, map, mergeMap, Observable, switchMap } from 'rxjs';
import { Users } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/services/api.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ApiService]
})


export class LoginComponent implements OnInit {
  isAdmin: boolean = false;
  users: Users[];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl(''),
  });
  constructor(private post: PostService, private authService: AuthentificationService,
     private api: ApiService, private router: Router, private toast: HotToastService,private user: UserService) { }
  ngOnInit(): void {
    document.body.className = "selector";
    this.api.loadUsers().subscribe((result: Users[]) => {
      const values = Object.values(result);
      this.users = values;
    })
  }
  //login from form
  get email() {
    return this.loginForm.get("email");
  }
  get password() {
    return this.loginForm.get("password");
  }
  submit() {
    const { email, password } = this.loginForm.value;
    if (!this.loginForm.valid || !email || !password) {
      return;
    }
    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: ({ message }) => `There was an error: ${message} `,
        })
      ).subscribe(() => {
        //provera
        console.log(email)
        for (let i = 0; i < this.users.length; i++) {
          if (email == this.users[i].email && this.users[i].role == "admin") {
            this.isAdmin = true
            this.post.Role=true
            this.user.Email=this.users[i].email
          }
        
        }
        if (this.isAdmin) {
          this.router.navigate(['/admin']);
          console.log(this.isAdmin)
        } else if (!this.isAdmin) {
          console.log(this.isAdmin)
          this.router.navigate(['/movies']);
        }
      });
  }




}