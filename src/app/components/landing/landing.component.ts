import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  backgroundUrl="/src/assets/images/background.jpg"
  constructor() { }

  ngOnInit(): void {
  }

}
