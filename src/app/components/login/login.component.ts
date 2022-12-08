import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  firebaseErrorMessage: string;
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

submit() {
  this.loading = true;
  this.authService.loginUser(this.form.value.username, this.form.value.password)
    .then(resp => {
      this.loading = false;
      this.doClaimsNavigation();
    })
    .catch(error => {
      this.loading = false;
      const errorCode = error.code;

      if (errorCode === 'auth/wrong-password') {
        this.errorMessage = 'Wrong password!';
      }
      else if (errorCode === 'auth/user-not-found') {
        this.errorMessage = 'User with given username does not exist!';
      } else {
        this.errorMessage = `Error: ${errorCode}.`;
      }

      this.form.reset({username: this.form.value.username, password: ''});
    });

}
loginUser() {
  if (this.loginForm.invalid)
      return;

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
doClaimsNavigation() {
  console.log('\nWaiting for claims navigation...')
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