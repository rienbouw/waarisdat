import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LatLng } from "@ionic-native/google-maps";
import { WaarisdatService } from "../service/waarisdat.service";

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

  constructor(public navCtrl: NavController, private router: Router, public waarisdatService: WaarisdatService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.feedItems = [];
    let nPhotos: number = 0; //this.waarisdatService.markersGuess.length;
    let totalScore: number = 0;
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
        score: "Foto #" + photoNumber + " afstand: " + distance + "m, score: " + score
      };
      this.feedItems.push(scoreListItem);
      console.log(scoreListItem.score);
      nPhotos += 1;
      totalScore += score;

    }
    totalScore = Math.round(totalScore / nPhotos);
    var scoreListItem = {
      score: "Totaal Score: " + totalScore.toString() + " van de 100"
    };
    this.feedItems.push(scoreListItem);
    console.log(scoreListItem.score);

  }

  restartButton() {
    this.router.navigate(['start']);
  }

  getDistanceBetween(p1, p2): number {
    return Number(google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(0));
  }
}
