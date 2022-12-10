import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router'
import { MoviesComponent } from './components/movies/movies.component';
import { RentMoviesComponent } from './components/rent-movies/rent-movies.component';
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
import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { AdminDbListComponent } from './components/admin/admin-db-list/admin-db-list.component';

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
    path: 'auth',
    pathMatch: 'full',
    component: AuthComponent,
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
    path: 'admin-db-list',
    pathMatch: 'full',
    component: AdminDbListComponent,
    canActivate: [AuthGuard,RoleGuard],
  },
  {
    path: 'admin-list',
    pathMatch: 'full',
    component: AdminDbListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'landing',
    pathMatch: 'full',
    component: LandingComponent,
  },
  {
    path: 'auth',
    pathMatch: 'full',
    component: AuthComponent,
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
