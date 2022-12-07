import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  ngOnInit(): void {
  }

  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) {
    this.loginForm = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email]),
        'password': new FormControl('', Validators.required)
    });

    this.firebaseErrorMessage = '';
}


loginUser() {
  if (this.loginForm.invalid)
      return;

  this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).then((result) => {
      if (result == null) {                               // null is success, false means there was an error
          console.log('logging in...');
          this.router.navigate(['/home']);                // when the user is logged in, navigate them to dashboard
      }
      else if (result.isValid == false) {
          console.log('login error', result);
          this.firebaseErrorMessage = result.message;
      }
  });
}

}