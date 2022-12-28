import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";

import { MovieItemComponent } from "./movie-list/movie-item/movie-item.component";
import { MovieListComponent } from "./movie-list/movie-list.component";
import { MoviesComponent } from "./movies.component";

@NgModule({
    declarations: [
        MoviesComponent,
        MovieListComponent,
        MovieItemComponent,
    ],
    imports: [
        RouterModule,
        BrowserModule,
        CardModule,
        ButtonModule,
        DialogModule,
        CommonModule,
        ReactiveFormsModule,
        TranslateModule.forRoot({
            loader:{
              provide:TranslateLoader, 
              useFactory: HttpLoaderFactory,
              deps: [HttpClient]
            }
          }),
    ],
    exports: [
        MoviesComponent,
        MovieListComponent,
        MovieItemComponent,



    ]
})

export class MoviesModule { }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
