import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  moviesType: string = 'movie'
  seriesType: string = 'series'

  constructor() { }

  ngOnInit(): void {
 
  }

}