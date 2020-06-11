import { Component } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { WaarisdatService } from "../service/waarisdat.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class PhotoPage {

  sliderOne: any;
  currentPhotoIndex;

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
}
