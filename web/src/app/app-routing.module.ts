import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NewGameComponent } from './pages/index/components/new-game/new-game.component';
import { JoinGameComponent } from './pages/index/components/join-game/join-game.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'new-game',
    pathMatch: 'full'
  },
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'new-game',
        component: NewGameComponent
      },
      {
        path: 'join-game',
        component: JoinGameComponent
      }
    ]
  },
  {
    path: 'game',
    loadChildren: () => import('./pages/game/game.module').then(m => m.GameModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: '**',
    redirectTo: 'new-game'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
