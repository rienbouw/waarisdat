import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WaarisdatService, PhotoMetadata } from "../service/waarisdat.service";
import { map } from "rxjs/operators";
import { throwError } from 'rxjs';
import { LatLng } from '@ionic-native/google-maps';

@Component({
  selector: 'app-finish-detail',
  templateUrl: './finish-detail.page.html',
  styleUrls: ['./finish-detail.page.scss'],
})
export class FinishDetailPage implements OnInit {

  photoNumber = 1;
  centerMarker: any = {};
  guessMarker: any = {};
  private photoMetadataList: Array<PhotoMetadata>;
  pmd: PhotoMetadata = <PhotoMetadata>{};
  public lines = [];

  constructor(
    private router: Router,
    public waarisdatService: WaarisdatService
  ) {

  }

  ngOnInit() {
    this.waarisdatService.getPhotoMetadataListOfCurrentLevel().then(result => {
      //console.log(result);
      this.photoMetadataList = result;
      this.photoNumber = this.waarisdatService.currentPhotoIndex + 1;
      this.pmd = this.photoMetadataList[this.photoNumber - 1];
      //console.log(this.pmd.imgUrl);
      this.centerMarker = {
        lat: Number(this.pmd.lat),
        lng: Number(this.pmd.lng),
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

      this.lines.push({
        lat: Number(this.pmd.lat),
        lng: Number(this.pmd.lng)
      });

      this.lines.push({
        lat: this.waarisdatService.markersGuess[this.photoNumber - 1]["lat"],
        lng: this.waarisdatService.markersGuess[this.photoNumber - 1]["lng"]
      });
    });
  }

  ionViewWillEnter() {

  }
  backButton() {
    this.router.navigate(['finish'])
  }
}
