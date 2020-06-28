import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LatLng } from "@ionic-native/google-maps";
import { WaarisdatService } from "../service/waarisdat.service";

import "../../../node_modules/@ionic/angular/css/core.css";

// /* Basic CSS for apps built with Ionic */
import "../../../node_modules/@ionic/angular/css/normalize.css";
import "../../../node_modules/@ionic/angular/css/structure.css";
import "../../../node_modules/@ionic/angular/css/typography.css";
import '../../../node_modules/@ionic/angular/css/display.css';

/* Optional CSS utils that can be commented out */
import "../../../node_modules/@ionic/angular/css/padding.css";
import "../../../node_modules/@ionic/angular/css/float-elements.css";
import "../../../node_modules/@ionic/angular/css/text-alignment.css";
import "../../../node_modules/@ionic/angular/css/text-transformation.css";
import "../../../node_modules/@ionic/angular/css/flex-utils.css";

declare var google;

interface ScoreListItem {
  score: number;
}

@Component({
  selector: 'app-finish',
  templateUrl: './finish.page.html',
  styleUrls: ['./finish.page.scss'],
})
export class FinishPage implements OnInit {


  feedItems = [];
  totalScore: number = 0;

  constructor(public navCtrl: NavController, private router: Router, public waarisdatService: WaarisdatService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.feedItems = [];
    let nPhotos: number = 0; //this.waarisdatService.markersGuess.length;

    for (var index in this.waarisdatService.markersGuess) {

      let guessMarker = this.waarisdatService.markersGuess[index];
      var photoNumber = guessMarker["photoNumber"];
      let latLngGuess = new google.maps.LatLng(guessMarker["lat"], guessMarker["lng"]);
      var correctLatLng: LatLng = this.waarisdatService.markersCorrect[photoNumber - 1];

      var distance = this.getDistanceBetween(latLngGuess, correctLatLng);
      let score: number = Math.round((1000 - distance) / 10);
      if (score < 0) {
        score = 0;
      }
      //var photoNumber: number = Number(index) + 1;
      var scoreListItem = {
        photo: "assets/images/Waarisdit-00" + photoNumber + ".jpg",
        photoNumber: photoNumber,
        distance: distance,
        score: score
      };
      this.feedItems.push(scoreListItem);
      console.log(scoreListItem.score);
      nPhotos += 1;
      this.totalScore += score;

    }
    console.log("Totaal Score: " + this.totalScore.toString() + " van de 100");

  }

  restartButton() {
    this.router.navigate(['start']);
  }

  getDistanceBetween(p1, p2): number {
    return Number(google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(0));
  }
}
