import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from "@agm/core";
import { IonicModule } from '@ionic/angular';
import { environment } from "../../environments/environment";
import { FinishPageRoutingModule } from './finish-routing.module';

import { FinishPage } from './finish.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FinishPageRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIKey
    })
  ],
  declarations: [FinishPage]
})
export class FinishPageModule { }
