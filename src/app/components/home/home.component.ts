import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // types = [{ type: 'War', }, { type: 'Love' }, { type: 'Action' }];

  types = [{ type: 'movie', }, { type: 'series' }];


  constructor(private api: ApiService) { }

  ngOnInit(): void {
  
  }

}