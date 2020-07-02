import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FinishDetailPage } from './finish-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FinishDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FinishDetailPageRoutingModule {}
