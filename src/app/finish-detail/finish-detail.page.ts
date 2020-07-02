import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaarisdatService } from "../service/waarisdat.service";
import { map } from "rxjs/operators";
import { throwError } from 'rxjs';

@Component({
  selector: 'app-finish-detail',
  templateUrl: './finish-detail.page.html',
  styleUrls: ['./finish-detail.page.scss'],
})
export class FinishDetailPage implements OnInit {

  photoNumber = 1;
  centerMarker: any;
  guessMarker: any;

  constructor(
    private router: Router,
    public waarisdatService: WaarisdatService
  ) {
  }

  ngOnInit() {
    this.photoNumber = this.waarisdatService.currentPhotoIndex + 1;

    this.centerMarker = {
      lat: this.waarisdatService.markersCorrect[this.photoNumber - 1].lat(),
      lng: this.waarisdatService.markersCorrect[this.photoNumber - 1].lng(),
      alpha: 1,
      icon: {
        url: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (this.waarisdatService.currentPhotoIndex + 1) + '|f5f242|000000',
        scaledSize: {
          width: 30,
          height: 40
        }
      },
      photoNumber: this.waarisdatService.currentPhotoIndex + 1
    };

    this.guessMarker = {
      lat: this.waarisdatService.markersGuess[this.photoNumber - 1]["lat"],
      lng: this.waarisdatService.markersGuess[this.photoNumber - 1]["lng"],
      alpha: 1,
      icon: {
        url: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + (this.waarisdatService.currentPhotoIndex + 1) + '|f5f242|000000',
        scaledSize: {
          width: 30,
          height: 40
        }
      },
      photoNumber: this.waarisdatService.currentPhotoIndex + 1
    };
  }

  ionViewWillEnter() {

  }
  backButton() {
    this.router.navigate(['finish'])
  }
}
