import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WaarisdatService } from "../service/waarisdat.service";
import { GoogleMap, Marker, MarkerOptions, GoogleMapsAnimation, GoogleMapsEvent } from "@ionic-native/google-maps";


declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class PhotoPage {

  sliderOne: any;
  currentPhotoIndex;
  klaarButtonText = "Gereed, laat mij de score zien";

  constructor(
    public navCtrl: NavController,
    private router: Router,
    public waarisdatService: WaarisdatService
  ) {

    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          id: 1
        },
        {
          id: 2
        },
        {
          id: 3
        },
        {
          id: 4
        },
        {
          id: 5
        }
      ]
    };
  }

  onPhotoClick(params: any) {
    this.waarisdatService.currentPhotoIndex = params;
    this.router.navigate(['/tabs/map'])

  }

  get_CurrentPhotoIndex() {
    return this.currentPhotoIndex;
  }

  SlideDidChange(sliderOne, slideWithNav) {

  }

  getDistanceBetween(point1, point2) {

    const p1 = new google.maps.LatLng(
      point1.lat,
      point1.lng
    );
    const p2 = new google.maps.LatLng(
      point2.lat,
      point2.lng
    );
    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(0);



  }

  klaarButton() {
    var marker1: Marker = this.waarisdatService.markersGuess[0];
    var marker2: Marker = this.waarisdatService.markersGuess[1];
    console.log(marker1, marker2);
    var distance = this.getDistanceBetween(marker1, marker2)
    this.klaarButtonText = (1000 - distance).toString();
  }
}
