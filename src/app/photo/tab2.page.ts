import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WaarisdatService } from "../service/waarisdat.service";
import { GoogleMap, Marker, MarkerOptions, GoogleMapsAnimation, GoogleMapsEvent, LatLng } from "@ionic-native/google-maps";
import { IonSlides } from '@ionic/angular';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class PhotoPage {

  @ViewChild(IonSlides) slides: IonSlides;

  public sliderOne: any;
  currentPhotoIndex;
  klaarButtonText = "KLAAR! Laat mij de score zien.";
  photoNumber = "1";
  firstView: boolean;

  slideChanged = ev => this.photoNumber = ev.realIndex + 1;

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


    this.firstView = true;
  }

  onPhotoClick(params: any) {
    //this.slides.lockSwipeToNext(true);
    this.waarisdatService.currentPhotoIndex = params;
    this.router.navigate(['/tabs/map'])

  }

  ionViewWillEnter() {
    if (this.firstView) {
      this.firstView = false;
    } else {
      if (this.waarisdatService.currentPhotoIndex == this.sliderOne.slidesItems.length - 1) {
        this.slides.slideTo(0);
      } else {
        this.slides.slideNext();
      }
    }
  }

  get_CurrentPhotoIndex() {
    return this.currentPhotoIndex;
  }

  SlideDidChange(ev) {

    this.currentPhotoIndex = this.slides.getActiveIndex();
    //this.photoNumber = this.slides.getActiveIndex() + 1;
    console.log("SlideDidChanged " + this.currentPhotoIndex);
  }


  // slideChanged(ev) {
  //   console.log("slideChanged");

  // }
  getDistanceBetween(p1, p2) {
    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(0);
  }

  klaarButton() {
    let nPhotos = this.waarisdatService.markersGuess.length;
    let totalScore: number = 0;
    for (var index in this.waarisdatService.markersGuess) {

      var p1: LatLng = this.waarisdatService.markersCorrect[index];
      var p2: LatLng = this.waarisdatService.markersGuess[index];
      console.log(p1, p2);
      var distance = this.getDistanceBetween(p1, p2);
      console.log(distance);
      let score: number = Math.round((1000 - distance) / 10);
      if (score < 0) {
        score = 0;
      }
      let photoNumber = index + 1;
      console.log("Foto " + photoNumber + " : " + score);
      totalScore += score;

    }
    totalScore = Math.round(totalScore / nPhotos);
    this.klaarButtonText = "Score: " + totalScore.toString() + " van de 100";

  }
}
