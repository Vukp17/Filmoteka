import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'
import { LoginComponent } from './components/login/login.component';
import { MoviesComponent } from './components/movies/movies.component';
import { RentMoviesComponent } from './components/rent-movies/rent-movies.component';
import { SingupComponent } from './components/signup/signup.component';
import { MovieResloverService } from './services/movie-reslover.service';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/admin/admin.component';
import { RoleGuard } from './guards/role.guard';
import { LandingComponent } from './components/landing/landing.component';
import { AdminDatabaseComponent } from './components/admin-database/admin-database.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';

const redirectToLogin = () => redirectUnauthorizedTo(['login']);
const redirectToHome = () => redirectLoggedInTo(['movies']);
const routes: Routes = [
  {
    path: 'rent',
    pathMatch: 'full',
    component: RentMoviesComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'movies',
    component: MoviesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: 'signup',
    pathMatch: 'full',
    component: SingupComponent,
  },
  {
    path: 'admin',
    pathMatch: 'full',
    component: AdminComponent,
    canActivate: [AuthGuard,RoleGuard],
  },
  {
    path: '',
    redirectTo: '/landing',
    pathMatch: 'full',
  },
  {
    path: 'admin-list',
    pathMatch: 'full',
    component: AdminDatabaseComponent,
    canActivate: [AuthGuard,RoleGuard],
  },
  {
    path: 'landing',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'access-denied',
    pathMatch: 'full',
    component: AccessDeniedComponent,
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
