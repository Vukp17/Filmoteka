import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
////////ROUTING//////////
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgImageSliderModule } from 'ng-image-slider';
///////PRIME NG////////
import { AccordionModule } from 'primeng/accordion';
import { MenubarModule } from 'primeng/menubar';
import { MenubarComponent } from './components/header/menubar/menubar.component';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {DropdownModule} from 'primeng/dropdown';
///////Material////////
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
//////COMPONENTS/////
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MovieListComponent } from './components/movies/movie-list/movie-list.component';
import { MovieItemComponent } from './components/movies/movie-list/movie-item/movie-item.component';
import { RentMoviesComponent } from './components/rent-movies/rent-movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';
import { LandingComponent } from './components/landing/landing.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { RentMoviesListComponent } from './components/rent-movies/rent-movies-list/rent-movies-list.component';
import { RentMoviesItemComponent } from './components/rent-movies/rent-movies-list/rent-movies-item/rent-movies-item.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdminListComponent } from './components/admin/admin-list/admin-list.component';
import { AdminListItemComponent } from './components/admin/admin-list/admin-list-item/admin-list-item.component';
///////Auth
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
//////Hot-toast
import { HotToastModule } from '@ngneat/hot-toast';
import { AuthComponent } from './components/auth/auth.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { UserTableComponent } from './user-table/user-table.component';
//ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AdminDbListComponent } from './components/admin/admin-db-list/admin-db-list.component';
import { AdminDbListItemComponent } from './components/admin/admin-db-list/admin-db-list-item/admin-db-list-item.component';
import { AdminAnalyticsComponent } from './components/admin/admin-analytics/admin-analytics.component';

import {SelectButtonModule} from 'primeng/selectbutton';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    MovieListComponent,
    MovieItemComponent,
    RentMoviesComponent,
    MenubarComponent,
    FooterComponent,
    LandingComponent,
    CarouselComponent,
    RentMoviesListComponent,
    RentMoviesItemComponent,
    HomeComponent,
    AdminComponent,
    AdminListComponent,
    AdminListItemComponent,
    AuthComponent,
    UserTableComponent,
    AdminDbListComponent,
    AdminDbListItemComponent,
    AdminAnalyticsComponent,
    AccessDeniedComponent

  ],
  imports: [
    BrowserModule,
    NgImageSliderModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    // Prime module imports
    MenubarModule,
    MenuModule,
    DialogModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    CarouselModule,
    InputTextModule,
    DividerModule,
    TableModule,
    CascadeSelectModule,
    SelectButtonModule,
    DropdownModule,
    //ngx-translate
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader, 
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),

    //Material
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    HotToastModule.forRoot()
    //Core UI,

  ],
  exports: [
    FormsModule
  ],
  providers: [{
    provide: FIREBASE_OPTIONS, useValue: environment.firebase
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}