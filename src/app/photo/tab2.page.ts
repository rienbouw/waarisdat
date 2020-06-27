import { Component, ViewChild } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WaarisdatService } from "../service/waarisdat.service";
import { GoogleMap, Marker, MarkerOptions, GoogleMapsAnimation, GoogleMapsEvent, LatLng } from "@ionic-native/google-maps";
import { IonSlides } from '@ionic/angular';
//import { } from '@types/googlemaps';

declare var google;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class PhotoPage {

  @ViewChild(IonSlides) slides: IonSlides;

  slideOptsOne = {
    zoom: {
      maxRatio: 5
    }
  };
  public sliderOne: any;
  currentPhotoIndex;
  klaarButtonText = "KLAAR! Laat mij de score zien.";
  photoNumber = 1;
  firstView: boolean;

  // slideChanged = ev => {
  //   console.log(ev);
  //   this.photoNumber = ev.realIndex + 1
  // };

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

  ngOnInit() {
    //console.log("ngOnInit photo"); enable the loggen, and this page will be initialized each time it is navigated to!!!!!
  }

  onPhotoClick(params: any) {
    //this.slides.lockSwipeToNext(true);
    this.waarisdatService.currentPhotoIndex = params;
    //console.log("onPhotoClick: currentPhotoIndex " + this.waarisdatService.currentPhotoIndex); //enable this line and ngOninit is called on map page!!!!!!!!!!!!
    this.router.navigate(['map'])

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
    this.slideChanged();
  }

  get_CurrentPhotoIndex() {
    return this.currentPhotoIndex;
  }

  // SlideDidChange(ev) {

  //   this.currentPhotoIndex = this.slides.getActiveIndex();
  //   //this.photoNumber = this.slides.getActiveIndex() + 1;
  //   console.log("SlideDidChanged " + this.currentPhotoIndex);
  // }


  slideChanged() {
    this.slides.getActiveIndex().then(index => {
      this.waarisdatService.currentPhotoIndex = index;
      this.photoNumber = index + 1;
    });
  }


  getDistanceBetween(p1, p2) {
    return google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(0);
  }

  klaarButton() {
    let nPhotos: number = 0; //this.waarisdatService.markersGuess.length;
    let totalScore: number = 0;
    for (var index in this.waarisdatService.markersGuess) {

      let guessMarker = this.waarisdatService.markersGuess[index];
      var photoNumber = guessMarker["photoNumber"];
      var latLngGuess: LatLng = new google.maps.LatLng(guessMarker["lat"], guessMarker["lng"]);
      var correctLatLng: LatLng = this.waarisdatService.markersCorrect[photoNumber - 1];

      var distance = this.getDistanceBetween(latLngGuess, correctLatLng);
      let score: number = Math.round((1000 - distance) / 10);
      if (score < 0) {
        score = 0;
      }
      //var photoNumber: number = Number(index) + 1;
      console.log("Foto " + photoNumber + " afstand: " + distance + "m, score: " + score);
      nPhotos += 1;
      totalScore += score;

    }
    totalScore = Math.round(totalScore / nPhotos);
    this.klaarButtonText = "Score: " + totalScore.toString() + " van de 100";

  }
}
