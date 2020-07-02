import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from "@agm/core";
import { IonicModule } from '@ionic/angular';
import { FinishDetailPageRoutingModule } from './finish-detail-routing.module';
import { FinishDetailPage } from './finish-detail.page';
import { environment } from "../../environments/environment";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishDetailPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIKey
    })
  ],
  declarations: [FinishDetailPage]
})
export class FinishDetailPageModule { }
