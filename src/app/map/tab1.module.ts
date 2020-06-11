import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapPage } from './tab1.page';
import { HttpClientModule } from '@angular/common/http';
//import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

//import { Tab1PageRoutingModule } from './tab1-routing.module';
import { AgmCoreModule } from "@agm/core";
import { environment } from "../../environments/environment";


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    //  ExploreContainerComponentModule,
    // Tab1PageRoutingModule,
    HttpClientModule,
    RouterModule.forChild([{ path: "", component: MapPage }]),
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIKey
    })
  ],
  declarations: [MapPage]
})
export class Tab1PageModule { }
