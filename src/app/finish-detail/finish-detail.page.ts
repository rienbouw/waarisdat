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
  centerLat: number;
  centerLng: number;

  constructor(
    private router: Router,
    public waarisdatService: WaarisdatService
  ) {
  }

  ngOnInit() {
    this.photoNumber = this.waarisdatService.currentPhotoIndex + 1;
    console.log(this.waarisdatService.markersGuess[this.photoNumber - 1]);
    this.centerLat = this.waarisdatService.markersGuess[this.photoNumber - 1]["lat"];
    this.centerLng = this.waarisdatService.markersGuess[this.photoNumber - 1]["lng"];
  }

  ionViewWillEnter() {

  }
  backButton() {
    this.router.navigate(['finish'])
  }
}
