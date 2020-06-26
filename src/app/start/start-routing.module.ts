import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StartPage } from './start.page';

const routes: Routes = [
  {
    path: '',
    component: StartPage
  },
  {
    path: 'plkjlkjhoto',
    redirectTo: '../../tabs/pxxhoto',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StartPageRoutingModule { }
