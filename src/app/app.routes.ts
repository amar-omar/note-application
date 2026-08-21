import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'content',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/content/content.component').then((m) => m.ContentComponent),
  },
  {
    path: 'notes',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/notes/notes.component').then((m) => m.NotesComponent),
  },
  {
    path: 'organize',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/organize/organize.component').then((m) => m.OrganizeComponent),
  },
  {
    path: 'navbar',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/navbar/navbar.component').then((m) => m.NavbarComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then(
        (m) => m.LoginComponent,
      ),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./components/register/register.component').then(
        (m) => m.RegisterComponent,
      ),
  },
  {
    path: 'logOut',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/log-out/log-out.component').then(
        (m) => m.LogOutComponent,
      ),
  },
  {
    path: '**',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./components/not-found/not-found.component').then(
        (m) => m.NotFoundComponent,
      ),
  },
];
