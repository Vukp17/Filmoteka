import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
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



  hide = true;
  errorMessage = '';
  loading = false;
  ngOnInit(): void {
  }

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
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
      console.log('tu sam u autu')
    }
    else if (!this.isLoginMode) {
      this.signup()
      console.log('tu sam u sajnapu')
    }
  }


  loginUser() {
    if (this.loginForm.invalid)
      return;

    console.log(this.loginForm.value.email)
    console.log(this.loginForm.value.password)

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {
        console.log(result)                    // null is success, false means there was an error
        console.log('logging in...');
        this.router.navigate(['/home']);
        // when the user is logged in, navigate them to dashboard
      }
      else if (result.isValid == false) {
        console.log('login error', result);
        this.firebaseErrorMessage = result.message;
      }
    });
  }

  signup() {
    if (this.form.invalid)                            // if there's an error in the form, don't submit it
      return;

    console.log(this.form.value)
    console.log(this.form)

    this.authService.signupUser(this.loginForm.value).then((result) => {

      if (result == null)                                 // null is success, false means there was an error
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