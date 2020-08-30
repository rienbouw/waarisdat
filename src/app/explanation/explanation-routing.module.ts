import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExplanationPage } from './explanation.page';

const routes: Routes = [
  {
    path: '',
    component: ExplanationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExplanationPageRoutingModule {}
