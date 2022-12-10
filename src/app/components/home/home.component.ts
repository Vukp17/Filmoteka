import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // types = [{ type: 'War', }, { type: 'Love' }, { type: 'Action' }];

  types: { type: string }[];


  constructor(private api: ApiService,private translate: TranslateService) { 
    this.types = [
      { type: 'movie' },
      { type: 'series' }
    ];

    this.translate.get('movies').subscribe(translation => {
      this.types[0].type = translation;
    });
    this.translate.get('series').subscribe(translation => {
      this.types[1].type = translation;
    });
  }

  ngOnInit(): void {
  
  }

}