import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FinishDetailMapPageRoutingModule } from './finish-detail-map-routing.module';

import { FinishDetailMapPage } from './finish-detail-map.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishDetailMapPageRoutingModule
  ],
  declarations: [FinishDetailMapPage]
})
export class FinishDetailMapPageModule {}
