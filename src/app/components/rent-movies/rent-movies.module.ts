import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { SharedModule } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { DialogModule } from "primeng/dialog";
import { MovieItemComponent } from "../movies/movie-list/movie-item/movie-item.component";
import { MovieListComponent } from "../movies/movie-list/movie-list.component";
import { MoviesComponent } from "../movies/movies.component";
import { RentMoviesItemComponent } from "./rent-movies-list/rent-movies-item/rent-movies-item.component";
import { RentMoviesListComponent } from "./rent-movies-list/rent-movies-list.component";
import { RentMoviesComponent } from "./rent-movies.component";

@NgModule({
    declarations: [
        RentMoviesComponent,
        RentMoviesListComponent,
        RentMoviesItemComponent,
    ],
    imports: [
        SharedModule,
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
        RentMoviesComponent,
        RentMoviesListComponent,
        RentMoviesItemComponent,



    ]
})

export class RentMoviesModule { }
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
