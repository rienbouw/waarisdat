import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
