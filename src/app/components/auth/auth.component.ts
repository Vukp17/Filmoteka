import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})


export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  firebaseErrorMessage: string;
  isLoginMode: boolean = true;

  form: FormGroup = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })

  hide:boolean = true;
  errorMessage: string = '';
  loading:boolean = false;

  ngOnInit(): void {
  }

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      'email': new FormControl('', [Validators.required, Validators.email]),
      'password': new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode
  }

  submit() {
    if (this.isLoginMode) {
      this.loginUser()
    }
    else if (!this.isLoginMode) {
      this.signup()
    }
  }

  loginUser() {
    if (this.loginForm.invalid)
      return;

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {
        this.router.navigate(['/home']);
      }
      else if (result.isValid == false) {
        this.firebaseErrorMessage = result.message;
      }
    });
  }

  signup() {
    if (this.form.invalid)                
      return;
    this.authService.signupUser(this.loginForm.value).then((result) => {
      if (result == null) 
        this.router.navigate(['/movies']);
      else if (result.isValid == false)
        this.firebaseErrorMessage = result.message;
    }).catch(() => {

    });
  }

  doClaimsNavigation() {
    this.authService.isAdminSubject
      .pipe(take(1)) // completes the observable after 1 take ==> to not run this after user logs out... because the subject will be updated again
      .subscribe(
        isAdmin => {
          if (isAdmin) {
            this.router.navigate(['/admin']);
          }
          else {
            this.router.navigate(['/items']);
          }
        }
      )
  }
}