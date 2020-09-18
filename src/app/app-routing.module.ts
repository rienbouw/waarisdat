import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { TestPage } from './test/test.page';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'start',
    loadChildren: () => import('./start/start.module').then(m => m.StartPageModule)
  },
  {
    path: 'photo',
    loadChildren: () => import('./photo/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'map',
    loadChildren: () => import('./map/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'finish',
    loadChildren: () => import('./finish/finish.module').then(m => m.FinishPageModule)
  },
  {
    path: 'finish-detail',
    loadChildren: () => import('./finish-detail/finish-detail.module').then(m => m.FinishDetailPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminPageModule)
  },
  {
    path: 'test', component: TestPage
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'explanation',
    loadChildren: () => import('./explanation/explanation.module').then( m => m.ExplanationPageModule)
  },
  {
    path: 'highscore',
    loadChildren: () => import('./highscore/highscore.module').then( m => m.HighscorePageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
