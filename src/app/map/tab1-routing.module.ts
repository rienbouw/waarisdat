import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { MapPage } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: MapPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {
  // constructor(private router: Router) {
  //   // override the route reuse strategy
  //   this.router.routeReuseStrategy.shouldReuseRoute = function () {
  //     return true;
  //   };
  // }
}
