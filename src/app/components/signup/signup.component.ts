import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireFunctions } from '@angular/fire/compat/functions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SingupComponent implements OnInit {
 
  signupForm: FormGroup;
  firebaseErrorMessage: string;
  
  constructor(private authService: AuthService,private userService: UserService,private router: Router, private afAuth: AngularFireAuth,private db: AngularFirestore,private fns: AngularFireFunctions) {
      this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
      this.signupForm = new FormGroup({
          'displayName': new FormControl('', Validators.required),
          'email': new FormControl('', [Validators.required, Validators.email]),
          'password': new FormControl('', Validators.required)
      });
  }

  signup() {
      if (this.signupForm.invalid)                            // if there's an error in the form, don't submit it
          return;

      this.authService.signupUser(this.signupForm.value).then((result) => {
            
          if (result == null)        
                                        // null is success, false means there was an error
              this.router.navigate(['/movies']);

          else if (result.isValid == false)
              this.firebaseErrorMessage = result.message;
      }).catch(() => {

      });
  }
 
}


