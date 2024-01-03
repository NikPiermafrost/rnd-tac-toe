import { Routes } from '@angular/router';

export const routes: Routes = [{
  loadComponent: () => import('./pages/home.component').then(m => m.HomeComponent),
  path: 'home',
}, {
  loadComponent: () => import('./pages/about.component').then(m => m.AboutComponent),
  path: 'about',
}, {
  loadComponent: () => import('./pages/game.component').then(m => m.GameComponent),
  path: 'game/:gameId',
}, {
  loadComponent: () => import('./pages/new-game.component').then(m => m.NewGameComponent),
  path: 'new-game',
}, {
  loadComponent: () => import('./pages/join-game.component').then(m => m.JoinGameComponent),
  path: 'join-game',
}, {
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
}, {
  path: '**',
  redirectTo: 'home',
}];
