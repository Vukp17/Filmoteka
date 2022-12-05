import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
////////ROUTING//////////
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgImageSliderModule } from 'ng-image-slider';
///////PRIME NG////////
import { AccordionModule } from 'primeng/accordion';    
import { MenubarModule } from 'primeng/menubar';
import { MenubarComponent } from './components/header/menubar/menubar.component';
import { MenuModule } from 'primeng/menu';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {InputTextModule} from 'primeng/inputtext';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
///////Material////////
import {MatInputModule} from '@angular/material/input';
import { MatToolbarModule } from "@angular/material/toolbar";
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
import { LoginComponent } from './components/login/login.component';
import { SingupComponent } from './components/signup/signup.component'
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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
//////Hot-toast
import { HotToastModule } from '@ngneat/hot-toast';
import { AdminDatabaseComponent } from './components/admin-database/admin-database.component';
import { AdminDatabseListComponent } from './components/admin-database/admin-databse-list/admin-databse-list.component';
import { AdminDatabseListItemComponent } from './components/admin-database/admin-databse-list/admin-databse-list-item/admin-databse-list-item.component';





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
    LoginComponent,
    LandingComponent,
    SingupComponent,
    CarouselComponent,
    RentMoviesListComponent,
    RentMoviesItemComponent,
    HomeComponent,
    AdminComponent,
    AdminListComponent,
    AdminListItemComponent,
    AdminDatabaseComponent,
    AdminDatabseListComponent,
    AdminDatabseListItemComponent

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
    //Material
    MatInputModule,
    MatToolbarModule,
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
    provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
