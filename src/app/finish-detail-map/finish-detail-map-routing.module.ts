import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishDetailMapPage } from './finish-detail-map.page';

const routes: Routes = [
  {
    path: '',
    component: FinishDetailMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishDetailMapPageRoutingModule {}
