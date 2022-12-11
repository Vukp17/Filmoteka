import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';

interface Country {
  name: string,
  code: string
}

@Injectable({
  providedIn: 'root'
})

export class MytranslateService {

  constructor(private translate: TranslateService) { }

  setLanguage(selectedCountry: Country,userItems:MenuItem[],items:MenuItem[]) {
    if (selectedCountry !== undefined) {
      this.translate.use(selectedCountry.code);
      const userKeys = ['navbar.home', 'navbar.movies', 'navbar.rent'];
      const userKeysLength = userKeys.length;
      userKeys.forEach((key, index) => {
        this.translate.get(key).subscribe((translation: string) => {
           userItems[index].label = translation;
        });
      });
      const itemsKeys = ['navbar.home', 'navbar.addmovies', 'navbar.dataBase', 'navbar.analytics'];
      const itemsKeysLength = itemsKeys.length;
      itemsKeys.forEach((key, index) => {
        this.translate.get(key).subscribe((translation: string) => {
            items[index].label = translation;
        });
      });
    }
  }
}