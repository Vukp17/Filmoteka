import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
////////ROUTING//////////
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgImageSliderModule } from 'ng-image-slider';
///////PRIME NG////////
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {SplitButtonModule} from 'primeng/splitbutton';

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
import { RentMoviesComponent } from './components/rent-movies/rent-movies.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './components/footer/footer.component';

import { RentMoviesListComponent } from './components/rent-movies/rent-movies-list/rent-movies-list.component';
import { RentMoviesItemComponent } from './components/rent-movies/rent-movies-list/rent-movies-item/rent-movies-item.component';
//novi moduli
import { MoviesModule } from './components/movies/movies.module';
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
//ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DialogComponent } from './components/dialog/dialog.component';
import { AdminModule } from './components/admin/admin.module';
import { HeaderModule } from './components/header/header.module';
import { HomeModule } from './components/home/home.module';
import { LandingModule } from './components/landing/landing.module';
import { RentMoviesModule } from './components/rent-movies/rent-movies.module';





@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    AuthComponent,
    AccessDeniedComponent,
    DialogComponent

  ],
  imports: [
    BrowserModule,
    NgImageSliderModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MoviesModule,
    AdminModule,
    HeaderModule,
    HomeModule,
    LandingModule,
    RentMoviesModule,
    // Prime module imports
    DialogModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    DividerModule,
    DropdownModule,
    SplitButtonModule,
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