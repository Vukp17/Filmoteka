import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class LandingComponent implements OnInit {
  backgroundUrl="/src/assets/images/background.jpg"
  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

}
